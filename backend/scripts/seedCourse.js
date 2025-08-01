const { Course } = require("../models");
const sequelize = require("../config/database");

async function seedCourse() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    const course = await Course.create({
      title: "Introduction to Web Development",
      description: "Learn the basics of HTML, CSS, and JavaScript.",
      status: "published",
    });
    console.log("✅ Course created:", course.toJSON());
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding course:", err);
    process.exit(1);
  }
}

seedCourse();
