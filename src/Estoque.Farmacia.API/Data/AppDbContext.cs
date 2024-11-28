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
                optionsBuilder.UseSqlServer("Server=DESKTOP-FQ4DD4J;Database=EstoqueFarmacia;Trusted_Connection=True;TrustServerCertificate=True;");
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
            // Relacionamento entre Medicamento e Fornecedor
            modelBuilder.Entity<Medicamento>()
                .HasOne(m => m.Fornecedor)  // Um Medicamento tem um Fornecedor
                .WithMany(f => f.Medicamentos)  // Um Fornecedor pode ter muitos Medicamentos
                .HasForeignKey(m => m.FornecedorId)  // Chave estrangeira para Fornecedor
                .OnDelete(DeleteBehavior.SetNull);  // Quando o Fornecedor for deletado, o Medicamento terá a chave estrangeira setada para null (não é deletado)
        }
    }
}