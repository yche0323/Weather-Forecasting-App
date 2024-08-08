# Weather Forecasting App

A React TypeScript application for weather forecasting.

## Table of Contents

- Getting Started
- Prerequisites
- Installation
- Running the Application
- Folder Structure

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (https://nodejs.org/)
- npm (https://www.npmjs.com/)
- Python (https://www.python.org/)

## Installation

### 1. Clone the Repository

```
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Create and Activate a Virtual Environment

Navigate to the backend folder and create a virtual environment:

```
cd backend
python -m venv env
Activate the virtual environment:
```

For Windows:

```
.\env\Scripts\activate
```

For macOS and Linux:

```
source env/bin/activate 3. Install Required Packages
```

### 3. Install Required Packages

Backend

Ensure you are in the backend folder:

```
npm install
```

Client

Navigate to the client folder and install the required packages:

```
cd ../client
npm install
```

## Running the Application

Backend

Ensure you are in the backend folder and the virtual environment is activated:

```
npm run dev
```

Client

In a new terminal, navigate to the client folder:

```
cd client
npm start
```

## Folder Structure

```
your-repo/
│
├── backend/
│ ├── env/ # Virtual environment
│ ├── src/ # Backend source code
│ ├── package.json # Backend npm packages
│ └── requirements.txt # Python packages
│
├── client/
│ ├── src/ # Client source code
│ ├── public/ # Public files
│ ├── package.json # Client npm packages
│ └── ... # Other client-related files
│
└── README.md # Project documentation
```
