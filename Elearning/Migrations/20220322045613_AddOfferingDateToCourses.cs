using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Elearning.Migrations
{
    public partial class AddOfferingDateToCourses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "OfferingDate",
                table: "Courses",
                nullable: true,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OfferingDate",
                table: "Courses");
            
        }
    }
}
