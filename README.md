# Super Tuber

A modern, feature-rich music and video download platform inspired by Tubidy.com. Built with React, TypeScript, and Express.js.

## Features

- 🎵 **Music Downloads** - High-quality music downloads with search functionality
- 🎬 **Video Downloads** - Video downloads with preview capabilities
- 🔄 **Media Converter** - Convert between different audio/video formats
- 📱 **Mobile-First Design** - Responsive design that works on all devices
- 🎨 **Modern UI** - Beautiful gradient designs with glass morphism effects
- ⚡ **Fast Performance** - Optimized for speed and user experience
- 🔍 **Advanced Search** - Search through music and videos easily
- 📊 **Top Downloads** - See what's trending and popular

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Wouter (routing)
- **Backend:** Express.js, TypeScript
- **Database:** In-memory storage with Drizzle ORM schema
- **UI Components:** Shadcn/UI with Radix UI primitives
- **Icons:** Lucide React
- **Styling:** Tailwind CSS with custom gradients and animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/prinsgras/super-tuber.git
cd super-tuber
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
super-tuber/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions and query client
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # In-memory data storage
│   └── vite.ts            # Vite integration
├── shared/                 # Shared TypeScript types
│   └── schema.ts          # Database schema and types
└── components.json         # Shadcn/UI configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Features Overview

### 🎵 Music Section
- Browse featured music tracks
- Download high-quality audio files
- View artist information and track details
- Track download counts and popularity

### 🎬 Video Section  
- Stream and download video content
- Multiple video formats supported
- Video thumbnails and previews
- Categories and filtering

### 🔄 Media Converter
- Convert between audio formats (MP3, WAV, FLAC, OGG)
- Convert between video formats (MP4, AVI, MOV)
- Drag and drop file upload
- Real-time conversion progress

### 📱 Mobile Apps
- iOS and Android app downloads
- Tablet and desktop versions
- Cross-platform compatibility

### 🎮 Media Player
- Professional audio/video player
- Full playback controls
- Volume control and progress tracking
- Playlist support

## API Endpoints

- `GET /api/media` - Get all media
- `GET /api/media/featured` - Get featured content
- `GET /api/media/type/:type` - Get media by type (music/video)
- `GET /api/media/search?q=query` - Search media
- `GET /api/downloads/top` - Get top downloads
- `POST /api/media/:id/download` - Download media file
- `POST /api/convert` - Convert media format

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Tubidy.com's functionality
- Built with modern web technologies
- UI components from Shadcn/UI
- Icons from Lucide React