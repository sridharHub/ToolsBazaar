using ToolsBazaar.Domain.OrderAggregate;

namespace ToolsBazaar.Persistence;

public class OrderRepository : IOrderRepository
{
    public IEnumerable<Order> GetAll() => DataSet.AllOrders;
    public Order GetById(int id) => DataSet.AllOrders.FirstOrDefault(order => order.Id == id);

    public void Add(Order order) => DataSet.AllOrders.Add(order); // Add method implemented here
}