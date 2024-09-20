using RabbitMQ.Client;

namespace GestaoMedicamentos.Produto.Services
{
    public class RabbitMqService : IDisposable
    {
        private readonly ConnectionFactory _factory;
        private IConnection _connection;
        private IModel _channel;

        public RabbitMqService(string connectionString)
        {
            _factory = new ConnectionFactory { Uri = new Uri(connectionString) };
        }

        public IModel GetChannel()
        {
            if (_connection == null || !_connection.IsOpen)
            {
                _connection = _factory.CreateConnection();
            }

            if (_channel == null || _channel.IsClosed)
            {
                _channel = _connection.CreateModel();
            }

            return _channel;
        }

        public void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
        }
    }
}