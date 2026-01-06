# Portfolio Website

A modern, responsive portfolio website built with [Kobweb](https://github.com/varabyte/kobweb) - a Kotlin/JS web framework powered by Jetpack Compose for Web.

## 🚀 About

This portfolio showcases the professional experience, technical skills, and achievements of **Bharath K Malviya**, an Android Engineer with 6 years of experience in mobile application development.

## 🛠️ Tech Stack

- **Framework**: [Kobweb](https://github.com/varabyte/kobweb) - Kotlin/JS web framework
- **UI**: Jetpack Compose for Web
- **Styling**: Silk (Kobweb's design system)
- **Markdown Support**: KobwebX Markdown
- **Build Tool**: Gradle
- **Language**: Kotlin

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK)** 11 or higher
- **Kobweb CLI** - Install via:
  ```bash
  $ curl -sSL https://kobweb.dev/install.sh | sh
  ```
  Or follow the [official installation guide](https://kobweb.varabyte.com/docs/install)

## 🏃 Getting Started

### Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. Navigate to the site directory:
   ```bash
   cd site
   ```

3. Run the development server:
   ```bash
   kobweb run
   ```

4. Open your browser and navigate to [http://localhost:8080](http://localhost:8080)

5. Press `Q` in the terminal to gracefully stop the server

### Live Reload

While Kobweb is running, any changes you make to the code will be automatically detected. The site will rebuild and reload automatically when ready.

## 📁 Project Structure

```
Portfolio/
├── site/                          # Main application module
│   ├── src/
│   │   └── jsMain/
│   │       ├── kotlin/
│   │       │   └── com/bharathmalviya/portfolio/
│   │       │       ├── AppEntry.kt          # Application entry point
│   │       │       ├── AppStyles.kt         # Global styles
│   │       │       ├── SiteTheme.kt         # Site-specific theme colors
│   │       │       ├── components/
│   │       │       │   ├── layouts/         # Page layouts
│   │       │       │   │   ├── PageLayout.kt
│   │       │       │   │   └── MarkdownLayout.kt
│   │       │       │   ├── sections/         # Reusable sections
│   │       │       │   │   ├── NavHeader.kt
│   │       │       │   │   └── Footer.kt
│   │       │       │   └── widgets/         # UI components
│   │       │       │       └── IconButton.kt
│   │       │       └── pages/
│   │       │           └── Index.kt         # Home page
│   │       └── resources/
│   │           ├── markdown/                # Markdown pages
│   │           │   └── About.md
│   │           └── public/                  # Static assets
│   │               ├── favicon.ico
│   │               └── kobweb-logo.png
│   └── build.gradle.kts
├── gradle/                        # Gradle configuration
├── settings.gradle.kts            # Project settings
└── README.md
```

## 🎨 Key Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between color themes with persistent preference
- **Modern UI**: Clean, professional design with smooth animations
- **Markdown Support**: Easy content management with markdown files
- **Fast Development**: Hot reload for instant feedback during development

## 📄 Pages

- **Home (`/`)**: Main portfolio page showcasing:
  - Profile summary
  - Core competencies
  - Technical skills
  - Work experience
  - Education
  - Social media links and contact information
- **About (`/about`)**: Additional information about the site (markdown-based)

## 🏗️ Building for Production

When you're ready to deploy, export the project as a static site:

1. Stop the development server (press `Q`)

2. Export the project:
   ```bash
   $ cd site
   $ kobweb export --layout static
   ```

3. Test the production build locally:
   ```bash
   $ kobweb run --env prod --layout static
   ```

4. The exported files will be in `.kobweb/site/` directory, ready to deploy to any static hosting provider (GitHub Pages, Netlify, Firebase, Vercel, etc.)

## 📚 Learn More

- [Kobweb Documentation](https://kobweb.varabyte.com/)
- [Kobweb GitHub Repository](https://github.com/varabyte/kobweb)
- [Static Deployment Guide](https://bitspittle.dev/blog/2022/staticdeploy)
- [Fullstack Deployment Guide](https://bitspittle.dev/blog/2023/clouddeploy)

## 💡 Development Tips

### Recommended IDE

We recommend using **IntelliJ IDEA Community Edition** (download via [Toolbox App](https://www.jetbrains.com/toolbox-app/)) for the best Kotlin development experience.

### Key Concepts

- **`@App`**: Annotation for the application entry point (found in `AppEntry.kt`)
- **`@Page`**: Annotation to mark composables as pages (automatically generates routes)
- **`@Layout`**: Annotation to apply layouts to pages
- **`CssStyle`**: Declare reusable CSS styles in a Kotlin-idiomatic way
- **`Modifier`**: Apply CSS styles and HTML attributes to elements

## 📝 License

This project is a personal portfolio website.

## 👤 Author

**Bharath K Malviya**

- Email: Bharathkmalviya@gmail.com
- LinkedIn: [bharath-k-malviya](https://linkedin.com/in/bharath-k-malviya)
- GitHub: [BharathKmalviya](https://github.com/BharathKmalviya)
- Twitter/X: [@BharathKmalviya](https://x.com/BharathKmalviya)
- Portfolio: [bharathmalviya.com](http://bharathmalviya.com/)

---

Built with ❤️ using Kobweb
