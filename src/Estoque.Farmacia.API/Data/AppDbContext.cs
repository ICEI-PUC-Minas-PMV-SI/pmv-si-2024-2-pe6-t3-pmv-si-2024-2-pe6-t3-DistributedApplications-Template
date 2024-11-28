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
            
            modelBuilder.Entity<Medicamento>()
                .HasOne(m => m.Fornecedor)  
                .WithMany(f => f.Medicamentos)  
                .HasForeignKey(m => m.FornecedorId) 
                .OnDelete(DeleteBehavior.SetNull);  
        }
    }
}
