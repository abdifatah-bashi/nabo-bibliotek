using Microsoft.EntityFrameworkCore;

namespace BookApi.Models;

public class BookContext : DbContext
{
    public BookContext(DbContextOptions<BookContext> options)
        : base(options)
    {
    }

    public DbSet<Book> Book { get; set; } = null!;
}