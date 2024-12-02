import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileNavBar from "./components/app/MobileNavBar";
import Sidebar from "./components/app/SideBar";
import Header from "./components/app/Header";
import ThreadCard from "./components/app/ThreadCard";
import { useSelector } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Preload } from "./components/app/Preload";

const ForumApp = () => {
  const { isPreload, authUser } = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  const [threads] = useState([
    {
      id: "thread-1",
      title: "The Future of Web Development",
      body: "Exploring the latest trends in web development...",
      category: "Tech",
      createdAt: "2024-12-02T07:00:00.000Z",
      owner: {
        id: "user-1",
        name: "Alex Chen",
        avatar: "/api/placeholder/32/32",
      },
      upVotesBy: ["user-2", "user-3"],
      downVotesBy: [],
      totalComments: 5,
      isHot: true,
    },
    {
      id: "thread-2",
      title: "UI Design Tips for 2025",
      body: "Essential design principles for modern interfaces...",
      category: "Design",
      createdAt: "2024-12-01T07:00:00.000Z",
      owner: {
        id: "user-2",
        name: "Sarah Miller",
        avatar: "/api/placeholder/32/32",
      },
      upVotesBy: ["user-1"],
      downVotesBy: [],
      totalComments: 3,
      isHot: true,
    },
    {
      id: "thread-1",
      title: "The Future of Web Development",
      body: "Exploring the latest trends in web development...",
      category: "Tech",
      createdAt: "2024-12-02T07:00:00.000Z",
      owner: {
        id: "user-1",
        name: "Alex Chen",
        avatar: "/api/placeholder/32/32",
      },
      upVotesBy: ["user-2", "user-3"],
      downVotesBy: [],
      totalComments: 5,
      isHot: true,
    },
    {
      id: "thread-1",
      title: "The Future of Web Development",
      body: "Exploring the latest trends in web development...",
      category: "Tech",
      createdAt: "2024-12-02T07:00:00.000Z",
      owner: {
        id: "user-1",
        name: "Alex Chen",
        avatar: "/api/placeholder/32/32",
      },
      upVotesBy: ["user-2", "user-3"],
      downVotesBy: [],
      totalComments: 5,
      isHot: true,
    },
    {
      id: "thread-1",
      title: "The Future of Web Development",
      body: "Exploring the latest trends in web development...",
      category: "Tech",
      createdAt: "2024-12-02T07:00:00.000Z",
      owner: {
        id: "user-1",
        name: "Alex Chen",
        avatar: "/api/placeholder/32/32",
      },
      upVotesBy: ["user-2", "user-3"],
      downVotesBy: [],
      totalComments: 5,
      isHot: true,
    },
    {
      id: "thread-1",
      title: "The Future of Web Development",
      body: "Exploring the latest trends in web development...",
      category: "Tech",
      createdAt: "2024-12-02T07:00:00.000Z",
      owner: {
        id: "user-1",
        name: "Alex Chen",
        avatar: "/api/placeholder/32/32",
      },
      upVotesBy: ["user-2", "user-3"],
      downVotesBy: [],
      totalComments: 5,
      isHot: true,
    },
    {
      id: "thread-1",
      title: "The Future of Web Development",
      body: "Exploring the latest trends in web development...",
      category: "Tech",
      createdAt: "2024-12-02T07:00:00.000Z",
      owner: {
        id: "user-1",
        name: "Alex Chen",
        avatar: "/api/placeholder/32/32",
      },
      upVotesBy: ["user-2", "user-3"],
      downVotesBy: [],
      totalComments: 5,
      isHot: true,
    },
    {
      id: "thread-1",
      title: "The Future of Web Development",
      body: "Exploring the latest trends in web development...",
      category: "Tech",
      createdAt: "2024-12-02T07:00:00.000Z",
      owner: {
        id: "user-1",
        name: "Alex Chen",
        avatar: "/api/placeholder/32/32",
      },
      upVotesBy: ["user-2", "user-3"],
      downVotesBy: [],
      totalComments: 5,
      isHot: true,
    },
    {
      id: "thread-1",
      title: "The Future of Web Development",
      body: "Exploring the latest trends in web development...",
      category: "Tech",
      createdAt: "2024-12-02T07:00:00.000Z",
      owner: {
        id: "user-1",
        name: "Alex Chen",
        avatar: "/api/placeholder/32/32",
      },
      upVotesBy: ["user-2", "user-3"],
      downVotesBy: [],
      totalComments: 5,
      isHot: true,
    },
    {
      id: "thread-1",
      title: "The Future of Web Development",
      body: "Exploring the latest trends in web development...",
      category: "Tech",
      createdAt: "2024-12-02T07:00:00.000Z",
      owner: {
        id: "user-1",
        name: "Alex Chen",
        avatar: "/api/placeholder/32/32",
      },
      upVotesBy: ["user-2", "user-3"],
      downVotesBy: [],
      totalComments: 5,
      isHot: true,
    },
    {
      id: "thread-1",
      title: "The Future of Web Development",
      body: "Exploring the latest trends in web development...",
      category: "Tech",
      createdAt: "2024-12-02T07:00:00.000Z",
      owner: {
        id: "user-1",
        name: "Alex Chen",
        avatar: "/api/placeholder/32/32",
      },
      upVotesBy: ["user-2", "user-3"],
      downVotesBy: [],
      totalComments: 5,
      isHot: true,
    },
    {
      id: "thread-1",
      title: "The Future of Web Development",
      body: "Exploring the latest trends in web development...",
      category: "Tech",
      createdAt: "2024-12-02T07:00:00.000Z",
      owner: {
        id: "user-1",
        name: "Alex Chen",
        avatar: "/api/placeholder/32/32",
      },
      upVotesBy: ["user-2", "user-3"],
      downVotesBy: [],
      totalComments: 5,
      isHot: true,
    },
  ]);

  useEffect(() => {
    // @TODO: dispatch async action to preload app
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  return isPreload ? (
    <Preload />
  ) : (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Header />
      <main className="lg:ml-64 pt-32 md:pt-20 pb-20 lg:pb-6 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {authUser != null && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <img
                    src="/api/placeholder/32/32"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <Input
                      placeholder="Start a discussion"
                      className="mb-3 bg-gray-50 dark:bg-gray-700"
                    />
                    <div className="flex flex-wrap gap-2 sm:justify-between sm:items-center">
                      <div className="flex gap-2 order-2 sm:order-1">
                        {["General", "Tech", "Design"].map((tag) => (
                          <Button
                            key={tag}
                            variant="outline"
                            size="sm"
                            className="text-sm"
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                      <Button className="w-full sm:w-auto order-1 sm:order-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-2 sm:mb-0">
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {threads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
          </div>
        </div>
      </main>

      <MobileNavBar />
    </div>
  );
};

export default ForumApp;
