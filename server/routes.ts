import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all media
  app.get("/api/media", async (req, res) => {
    try {
      const media = await storage.getAllMedia();
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media" });
    }
  });

  // Get featured media
  app.get("/api/media/featured", async (req, res) => {
    try {
      const media = await storage.getFeaturedMedia();
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured media" });
    }
  });

  // Get media by type
  app.get("/api/media/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const media = await storage.getMediaByType(type);
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media by type" });
    }
  });

  // Search media
  app.get("/api/media/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const media = await storage.searchMedia(query);
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: "Failed to search media" });
    }
  });

  // Get top downloads
  app.get("/api/downloads/top", async (req, res) => {
    try {
      const topDownloads = await storage.getTopDownloads();
      res.json(topDownloads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch top downloads" });
    }
  });

  // Download media (increment download count)
  app.post("/api/media/:id/download", async (req, res) => {
    try {
      const mediaId = parseInt(req.params.id);
      if (isNaN(mediaId)) {
        return res.status(400).json({ message: "Invalid media ID" });
      }

      const media = await storage.getMediaById(mediaId);
      if (!media) {
        return res.status(404).json({ message: "Media not found" });
      }

      await storage.incrementDownloads(mediaId);
      res.json({ message: "Download started", fileUrl: media.fileUrl });
    } catch (error) {
      res.status(500).json({ message: "Failed to start download" });
    }
  });

  // Convert media (mock endpoint)
  app.post("/api/convert", async (req, res) => {
    try {
      const schema = z.object({
        fromFormat: z.string(),
        toFormat: z.string(),
        fileUrl: z.string().optional()
      });

      const { fromFormat, toFormat } = schema.parse(req.body);

      // Simulate conversion process
      setTimeout(() => {
        res.json({
          message: "Conversion completed",
          fromFormat,
          toFormat,
          convertedUrl: `/downloads/converted-file.${toFormat}`
        });
      }, 2000);
    } catch (error) {
      res.status(400).json({ message: "Invalid conversion request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
