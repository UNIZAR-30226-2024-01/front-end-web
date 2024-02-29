
import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

const app = express();
const port = 3000;

// PostgreSQL credentials
const pool = new Pool({
  host: 'buy8mj63a08xmrni7uy4-postgresql.services.clever-cloud.com',
  database: 'buy8mj63a08xmrni7uy4',
  user: 'ufjuuu4tmgx8hdaosrpx',
  password: 'q1kiKLYfUCeC2TMzERwubKYLdZ5rSu',
  port: 50013
});

// Test the database connection
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
    done();
  }
});

// Define your API routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

