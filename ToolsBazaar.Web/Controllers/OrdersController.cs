using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Data.Common;
using System.Linq;
using ToolsBazaar.Domain.OrderAggregate;
using ToolsBazaar.Domain.ProductAggregate;

namespace ToolsBazaar.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ILogger<OrdersController> _logger;
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;

        public OrdersController(ILogger<OrdersController> logger, IProductRepository productRepository, IOrderRepository orderRepository)
        {
            _logger = logger;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
        }

        [HttpGet]
        public IEnumerable<Order> GetAll()
        {
            _logger.LogInformation("Fetching all Orders...");

            return _orderRepository.GetAll();
        }

        public class CreateOrderRequest
        {
            public int ProductId { get; set; }
            public int Quantity { get; set; }
        }


        [HttpPost]
        public IActionResult CreateOrder([FromBody] CreateOrderRequest request)
        {
 
            int productId = request.ProductId;
            int quantity = request.Quantity;

            _logger.LogInformation($"Creating order for product id {productId} with quantity {quantity}...");

            if (productId <= 0 || quantity <= 0)
            {
                productId = 2;
                quantity = 20;
            }


            //Validate product ID and quantity
            if (productId <= 0 || quantity <= 0)
            {
                _logger.LogWarning($"Invalid productId ({productId}) or quantity ({quantity})");

                return BadRequest("Invalid product ID or quantity");
            }

            // Get product
            var product = _productRepository.GetById(productId);

            if (product == null)
            {
                _logger.LogWarning($"Product with ID {productId} not found");

                return BadRequest("Product not found");
            }

            // Calculate total price
            decimal totalPrice = product.Price * quantity;

            if (totalPrice > 3000)
            {
                _logger.LogWarning($"Total price ${totalPrice} exceeds limit of $3000");
            }
            // Set ID to next max id +1 
            var orders = _orderRepository.GetAll();
            int maxOrderId = orders.Max(o => o.Id);




            // Create order
            var order = new Order
            {
                Id = maxOrderId + 1, // Hard-coded 
                Customer = null, // Hard-coded
                Items = new List<OrderItem>
                {
                    new OrderItem
                    {
                        Id = 1, // Hard-coded 
                        Product = product,
                        Quantity = quantity
                    }
                }
            };

            //DataRecord created out put
            //{ "id":601,"date":"0001-01-01T00:00:00","totalAmount":14999.80,"items":[{ "id":1,"quantity":20,
            //"product":{ "id":2,"name":"Spacepro Opaque Internal Sliding Glass Door Kit","price":749.99},
            //"price":14999.80}],"customer":null}]




            // Add order to repository
            _orderRepository.Add(order);

            return Ok("Order created successfully");
        }
    }
}
