﻿// <auto-generated />
using System;
using Estoque.Farmacia.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Estoque.Farmacia.API.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20241031183245_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Estoque.Farmacia.API.Models.Entrada", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DataEntrada")
                        .HasColumnType("datetime2");

                    b.Property<int>("LoteId")
                        .HasColumnType("int");

                    b.Property<int>("QuantidadeRecebida")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LoteId");

                    b.ToTable("Entradas");
                });

            modelBuilder.Entity("Estoque.Farmacia.API.Models.Fornecedor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CNPJ")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NomeFantasia")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Telefone")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Fornecedores");
                });

            modelBuilder.Entity("Estoque.Farmacia.API.Models.Lote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DataFabricacao")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataValidade")
                        .HasColumnType("datetime2");

                    b.Property<int?>("MedicamentoId")
                        .HasColumnType("int");

                    b.Property<int>("Quantidade")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MedicamentoId");

                    b.ToTable("Lotes");
                });

            modelBuilder.Entity("Estoque.Farmacia.API.Models.Medicamento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("FornecedorId")
                        .HasColumnType("int");

                    b.Property<byte[]>("Imagem")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("NomeComercial")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("PrecoCusto")
                        .HasPrecision(18, 2)
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("PrecoVenda")
                        .HasPrecision(18, 2)
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("FornecedorId");

                    b.ToTable("Medicamentos");
                });

            modelBuilder.Entity("Estoque.Farmacia.API.Models.Saida", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DataSaida")
                        .HasColumnType("datetime2");

                    b.Property<int>("LoteId")
                        .HasColumnType("int");

                    b.Property<int>("QuantidadeSaida")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LoteId");

                    b.ToTable("Saidas");
                });

            modelBuilder.Entity("Estoque.Farmacia.API.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("NomeUsuario")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("Estoque.Farmacia.API.Models.Entrada", b =>
                {
                    b.HasOne("Estoque.Farmacia.API.Models.Lote", null)
                        .WithMany("Entradas")
                        .HasForeignKey("LoteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Estoque.Farmacia.API.Models.Lote", b =>
                {
                    b.HasOne("Estoque.Farmacia.API.Models.Medicamento", "Medicamento")
                        .WithMany()
                        .HasForeignKey("MedicamentoId");

                    b.Navigation("Medicamento");
                });

            modelBuilder.Entity("Estoque.Farmacia.API.Models.Medicamento", b =>
                {
                    b.HasOne("Estoque.Farmacia.API.Models.Fornecedor", null)
                        .WithMany("Medicamentos")
                        .HasForeignKey("FornecedorId");
                });

            modelBuilder.Entity("Estoque.Farmacia.API.Models.Saida", b =>
                {
                    b.HasOne("Estoque.Farmacia.API.Models.Lote", null)
                        .WithMany("Saidas")
                        .HasForeignKey("LoteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Estoque.Farmacia.API.Models.Fornecedor", b =>
                {
                    b.Navigation("Medicamentos");
                });

            modelBuilder.Entity("Estoque.Farmacia.API.Models.Lote", b =>
                {
                    b.Navigation("Entradas");

                    b.Navigation("Saidas");
                });
#pragma warning restore 612, 618
        }
    }
}
