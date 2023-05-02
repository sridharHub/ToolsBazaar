using FluentAssertions;
using Moq;
using ToolsBazaar.Domain.OrderAggregate;
using ToolsBazaar.Domain.ProductAggregate;
using Microsoft.Extensions.Logging;
using Xunit;
using ToolsBazaar.Web.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ToolsBazaar.Tests.Controllers
{
    public class OrdersControllerTests
    {
        private readonly OrdersController _controller;
        private readonly Mock<IProductRepository> _productRepositoryMock;
        private readonly Mock<IOrderRepository> _orderRepositoryMock;
        private readonly Mock<ILogger<OrdersController>> _loggerMock;

        public OrdersControllerTests()
        {
            _productRepositoryMock = new Mock<IProductRepository>();
            _orderRepositoryMock = new Mock<IOrderRepository>();
            _loggerMock = new Mock<ILogger<OrdersController>>();
            _controller = new OrdersController(_loggerMock.Object, _productRepositoryMock.Object, _orderRepositoryMock.Object);
        }

        [Fact]
        public void CreateOrder_WithValidProductIdAndQuantity_ShouldReturnOkResult()
        {
            // Arrange
            int productId = 1;
            int quantity = 2;

            var product = new Product
            {
                Id = productId,
                Name = "Test Product",
                Price = 10.0m
            };

            _productRepositoryMock.Setup(p => p.GetById(productId)).Returns(product);

            // Act
            var result = _controller.CreateOrder(productId, quantity);
            //var result = "Ok";

            // Assert
            result.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public void CreateOrder_WithInvalidProductId_ShouldReturnBadRequestResult()
        {
            // Arrange
            int productId = -1;
            int quantity = 2;

            // Act
            var result = _controller.CreateOrder(productId, quantity);

            // Assert
            result.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public void CreateOrder_WithInvalidQuantity_ShouldReturnBadRequestResult()
        {
            // Arrange
            int productId = 1;
            int quantity = -1;

            // Act
            var result = _controller.CreateOrder(productId, quantity);

            // Assert
            result.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public void CreateOrder_WithNonExistentProduct_ShouldReturnBadRequestResult()
        {
            // Arrange
            int productId = 1;
            int quantity = 2;

            _productRepositoryMock.Setup(p => p.GetById(productId)).Returns((Product)null);

            // Act
            var result = _controller.CreateOrder(productId, quantity);
            //var result = "Ok";
            // Assert
            result.Should().BeOfType<BadRequestObjectResult>();
        }
    }
}
