using Estoque.Farmacia.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Estoque.Farmacia.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=34.226.109.249;Database=EstoqueFarmacia;User Id=sa;Password=Aleatorio@123;TrustServerCertificate=True;");
            }
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Fornecedor> Fornecedores { get; set; }
        public DbSet<Medicamento> Medicamentos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<Entrada> Entradas { get; set; }
        public DbSet<Saida> Saidas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Medicamento>().Property(m => m.PrecoCusto).HasPrecision(18, 2);
            modelBuilder.Entity<Medicamento>().Property(m => m.PrecoVenda).HasPrecision(18, 2);
        }
    }
}