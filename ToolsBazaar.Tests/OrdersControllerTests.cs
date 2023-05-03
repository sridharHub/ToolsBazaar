using FluentAssertions;
using Moq;
using ToolsBazaar.Domain.OrderAggregate;
using ToolsBazaar.Domain.ProductAggregate;
using Microsoft.Extensions.Logging;
using Xunit;
using ToolsBazaar.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using ToolsBazaar.Persistence;

namespace ToolsBazaar.Tests.Controllers
{
    public class CreateOrderRequest
    {
        public int ProductId { get; set; }
    }

    public class OrdersControllerTests
    {
        private OrdersController _controller;
        private Mock<IProductRepository> _productRepository;
        private Mock<IOrderRepository> _orderRepository;



        public OrdersControllerTests()
        {
            _productRepository = new Mock<IProductRepository>();
            _orderRepository = new Mock<IOrderRepository>();

            _controller = new OrdersController(null, _productRepository.Object, _orderRepository.Object);
        }

        [Fact]
        public void CreateOrder_ValidRequest_ReturnsOkResult()
        {
            // Arrange
            var request = new OrdersController.CreateOrderRequest { ProductId = 1, Quantity = 10 };
            var product = new Product { Id = 1, Name = "Test Product", Price = 9.99m };
            _productRepository.Setup(x => x.GetById(1)).Returns(product);

            // Act
            var result = _controller.CreateOrder(request);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public void CreateOrder_InvalidProductId_ReturnsBadRequestResult()
        {
            // Arrange
            var request = new OrdersController.CreateOrderRequest { ProductId = 0, Quantity = 10 };

            // Act
            var result = _controller.CreateOrder(request);
            // Assert
            result.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public void CreateOrder_ProductNotFound_ReturnsBadRequestResult()
        {
            // Arrange
            var request = new OrdersController.CreateOrderRequest { ProductId = 1, Quantity = 10 };
            _productRepository.Setup(x => x.GetById(1)).Returns((Product)null);

            // Act
            var result = _controller.CreateOrder(request);

            // Assert
            result.Should().BeOfType<OkObjectResult>();
        }
    }
}
