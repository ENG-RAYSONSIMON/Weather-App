# Weather App - Tellam Tech

A modern, responsive weather application built with Node.js, Express, and Bootstrap.

## 🚀 Features

- Real-time weather data from OpenWeatherMap API
- Beautiful, responsive UI with Bootstrap 5
- Clean and organized code structure
- Error handling and validation
- Environment variable configuration
- Static file serving

## 📁 Project Structure

```
weather-app/
├── views/
│   └── index.html          # Home page template
├── public/
│   └── css/
│       └── styles.css      # Stylesheet
├── server.js               # Main application file
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables (create from .env.example)
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore file
└── README.md               # This file
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_actual_api_key_here
   PORT=5000
   ```

4. **Get your API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key
   - Add it to your `.env` file

## 🚀 Usage

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Visit `http://localhost:port` in your browser.

## 🎨 Best Practices Implemented

### 1. **Separation of Concerns**
   - HTML templates in `views/` folder
   - CSS in `public/css/` folder
   - Server logic separated from rendering logic

### 2. **Environment Variables**
   - API keys stored in `.env` file (not committed to Git)
   - Configuration centralized in CONFIG object
   - `.env.example` provided for team members

### 3. **Error Handling**
   - Input validation
   - API error handling
   - User-friendly error messages
   - Proper HTTP status codes

### 4. **Security**
   - API keys not exposed in code
   - Input sanitization with `encodeURIComponent`
   - `.gitignore` prevents sensitive data commits

### 5. **Code Organization**
   - Functions for specific tasks (getWeatherData, renderWeatherPage)
   - Promises for async operations
   - Clean, readable code with comments

### 6. **User Experience**
   - Responsive design
   - Loading states
   - Clear error messages
   - Consistent branding

### 7. **Development Workflow**
   - `nodemon` for auto-restart during development
   - Clear npm scripts
   - Proper package.json configuration

## 🔧 Additional Improvements You Can Make

### 1. **Use a Template Engine**
Instead of string concatenation, use EJS, Pug, or Handlebars:
```bash
npm install ejs
```

### 2. **Add Frontend JavaScript**
- Loading spinner while fetching data
- Client-side form validation
- Search history

### 3. **Database Integration**
- Store search history
- User favorites
- Cache weather data

### 4. **API Rate Limiting**
- Prevent abuse
- Cache responses

### 5. **Testing**
```bash
npm install --save-dev jest supertest
```

### 6. **Logging**
```bash
npm install morgan winston
```

### 7. **Use Axios Instead of HTTPS Module**
```bash
npm install axios
```

## 📝 API Endpoints

| Method | Endpoint   | Description           |
|--------|------------|-----------------------|
| GET    | /          | Home page             |
| POST   | /weather   | Get weather data      |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Tellam Tech**

## 🙏 Acknowledgments

- [OpenWeatherMap API](https://openweathermap.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Express.js](https://expressjs.com/)