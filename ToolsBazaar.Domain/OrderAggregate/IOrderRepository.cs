namespace ToolsBazaar.Domain.OrderAggregate;

public interface IOrderRepository
{
    IEnumerable<Order> GetAll();
    Order GetById(int id);
    void Add(Order order); // Add method added here
}