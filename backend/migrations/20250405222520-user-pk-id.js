"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add a column only if it doesn't exist
    const tableDescription = await queryInterface.describeTable("Todos");
    if (!tableDescription.userId) {
      await queryInterface.addColumn("Todos", "userId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Ensure this is the correct model name
          key: "id",
        },
        onDelete: "CASCADE",
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback the addition of the userId column if needed
    await queryInterface.removeColumn("Todos", "userId");
  },
};
