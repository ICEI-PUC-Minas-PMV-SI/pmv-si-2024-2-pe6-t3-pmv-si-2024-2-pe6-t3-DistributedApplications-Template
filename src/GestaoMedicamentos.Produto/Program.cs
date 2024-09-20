using GestaoMedicamentos.Produto.Data;
using GestaoMedicamentos.Produto.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MedicamentosContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MedicamentosDB")));

builder.Services.AddScoped<RabbitMqService>(sp => new RabbitMqService("amqp://guest:guest@localhost:5672/"));

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
