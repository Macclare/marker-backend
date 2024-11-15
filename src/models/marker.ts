import { DataTypes, Model, Optional } from 'sequelize';
import { db } from '../config';

// Define an interface for the attributes of the model
export interface MarkerAttributes {
  id: string; // Change to UUID
  millName: string;
  latitude: number;
  longitude: number;
  p1Amount: number;
  numTransactions: number;
  p1PriceTon: number;
  lastTransactionDate: Date;
}

// Define an interface for optional attributes during creation
interface MarkerCreationAttributes extends Optional<MarkerAttributes, 'id'> {}

// Extend the Sequelize Model class
class Marker extends Model<MarkerAttributes, MarkerCreationAttributes> implements MarkerAttributes {
  public id!: string; // UUID as the primary key
  public millName!: string;
  public latitude!: number;
  public longitude!: number;
  public p1Amount!: number;
  public numTransactions!: number;
  public p1PriceTon!: number;
  public lastTransactionDate!: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the Sequelize model
Marker.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4, // Generate UUID on creation
      primaryKey: true,
    },
    millName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    p1Amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    numTransactions: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    p1PriceTon: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    lastTransactionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize: db, // Pass the Sequelize instance
    tableName: 'markers', // Define the table name
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default Marker;
