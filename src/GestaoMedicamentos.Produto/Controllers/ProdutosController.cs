using GestaoMedicamentos.Produto.Data;
using GestaoMedicamentos.Produto.Models;
using GestaoMedicamentos.Produto.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;

namespace GestaoMedicamentos.Produto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly MedicamentosContext _context;
        private readonly RabbitMqService _rabbitMqService;

        public ProdutosController(MedicamentosContext context, RabbitMqService rabbitMqService)
        {
            _context = context;
            _rabbitMqService = rabbitMqService;
        }

        // GET: api/Produtos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GestaoMedicamentos.Produto.Models.Produto>>> GetProdutos()
        {
            return await _context.Produtos.ToListAsync();
        }

        // GET: api/Produtos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GestaoMedicamentos.Produto.Models.Produto>> GetProduto(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);

            if (produto == null)
            {
                return NotFound();
            }

            return produto;
        }

        // PUT: api/Produtos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduto(int id, GestaoMedicamentos.Produto.Models.Produto produto)
        {
            if (id != produto.Id)
            {
                return BadRequest();
            }

            _context.Entry(produto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProdutoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Produtos
        [HttpPost]
        public async Task<ActionResult<GestaoMedicamentos.Produto.Models.Produto>> PostProduto(GestaoMedicamentos.Produto.Models.Produto produto)
        {
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();

            using var channel = _rabbitMqService.GetChannel();
            channel.QueueDeclare(queue: "fila_produtos", durable: true, exclusive: false, autoDelete: false, arguments: null);

            string mensagem = JsonConvert.SerializeObject(produto);
            var body = Encoding.UTF8.GetBytes(mensagem);

            channel.BasicPublish(exchange: "", routingKey: "fila_produtos", basicProperties: null, body: body);

            return CreatedAtAction("GetProduto", new { id = produto.Id }, produto);
        }

        // DELETE: api/Produtos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);
            if (produto == null)
            {
                return NotFound();
            }

            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProdutoExists(int id)
        {
            return _context.Produtos.Any(e => e.Id == id);
        }
    }
}