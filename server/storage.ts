import { users, media, topDownloads, type User, type InsertUser, type Media, type InsertMedia, type TopDownload, type InsertTopDownload } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllMedia(): Promise<Media[]>;
  getFeaturedMedia(): Promise<Media[]>;
  getMediaByType(type: string): Promise<Media[]>;
  getMediaById(id: number): Promise<Media | undefined>;
  createMedia(media: InsertMedia): Promise<Media>;
  searchMedia(query: string): Promise<Media[]>;
  
  getTopDownloads(): Promise<(TopDownload & { media: Media })[]>;
  incrementDownloads(mediaId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private media: Map<number, Media>;
  private topDownloads: Map<number, TopDownload>;
  private currentUserId: number;
  private currentMediaId: number;
  private currentTopDownloadId: number;

  constructor() {
    this.users = new Map();
    this.media = new Map();
    this.topDownloads = new Map();
    this.currentUserId = 1;
    this.currentMediaId = 1;
    this.currentTopDownloadId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample music and video data
    const sampleMedia: InsertMedia[] = [
      // Music
      {
        title: "Trending Hits 2024",
        artist: "Various Artists",
        type: "music",
        category: "Pop",
        duration: "3:45",
        downloads: 1200000,
        featured: true,
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        fileUrl: "/downloads/trending-hits-2024.mp3"
      },
      {
        title: "Electronic Beats",
        artist: "DJ Master",
        type: "music",
        category: "Electronic",
        duration: "4:20",
        downloads: 890000,
        featured: true,
        imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        fileUrl: "/downloads/electronic-beats.mp3"
      },
      // Videos
      {
        title: "Music Video Collection",
        artist: "Various Artists",
        type: "video",
        category: "Music Video",
        duration: "3:45",
        downloads: 950000,
        featured: false,
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        fileUrl: "/downloads/music-video-collection.mp4"
      },
      {
        title: "Live Concert Highlights",
        artist: "Concert Crew",
        type: "video",
        category: "Concert",
        duration: "45:30",
        downloads: 780000,
        featured: false,
        imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
        fileUrl: "/downloads/live-concert.mp4"
      }
    ];

    // Add all sample media
    sampleMedia.forEach(item => {
      this.createMedia(item);
    });

    // Create top downloads
    const topDownloadsData = [
      { mediaId: 1, rank: 1, downloads: 1200000 },
      { mediaId: 2, rank: 2, downloads: 890000 },
      { mediaId: 3, rank: 3, downloads: 950000 }
    ];

    topDownloadsData.forEach(item => {
      const id = this.currentTopDownloadId++;
      const topDownload: TopDownload = { ...item, id };
      this.topDownloads.set(id, topDownload);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllMedia(): Promise<Media[]> {
    return Array.from(this.media.values());
  }

  async getFeaturedMedia(): Promise<Media[]> {
    return Array.from(this.media.values()).filter(item => item.featured);
  }

  async getMediaByType(type: string): Promise<Media[]> {
    return Array.from(this.media.values()).filter(item => item.type === type);
  }

  async getMediaById(id: number): Promise<Media | undefined> {
    return this.media.get(id);
  }

  async createMedia(insertMedia: InsertMedia): Promise<Media> {
    const id = this.currentMediaId++;
    const media: Media = { ...insertMedia, id };
    this.media.set(id, media);
    return media;
  }

  async searchMedia(query: string): Promise<Media[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.media.values()).filter(item =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.artist.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getTopDownloads(): Promise<(TopDownload & { media: Media })[]> {
    const topDownloadsList = Array.from(this.topDownloads.values())
      .sort((a, b) => a.rank - b.rank);
    
    return topDownloadsList.map(download => {
      const media = this.media.get(download.mediaId);
      if (!media) throw new Error(`Media not found for download ${download.id}`);
      return { ...download, media };
    });
  }

  async incrementDownloads(mediaId: number): Promise<void> {
    const media = this.media.get(mediaId);
    if (media) {
      media.downloads++;
      this.media.set(mediaId, media);
    }
  }
}

export const storage = new MemStorage();