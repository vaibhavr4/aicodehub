"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search, SlidersHorizontal, TrendingUp, CheckCircle2, Circle } from "lucide-react";

interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: string;
  category: string;
  tags: string[];
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "EASY":
      return "text-green-600 bg-green-50 dark:bg-green-950 border-green-200";
    case "MEDIUM":
      return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 border-yellow-200";
    case "HARD":
      return "text-red-600 bg-red-50 dark:bg-red-950 border-red-200";
    default:
      return "text-gray-600 bg-gray-50";
  }
}

// Simulated acceptance rates for demo
function getAcceptanceRate(index: number) {
  const rates = [65, 72, 48, 81, 55, 43, 67, 39, 58, 71];
  return rates[index % rates.length];
}

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/problems")
      .then((res) => res.json())
      .then((data) => {
        setProblems(data);
        setFilteredProblems(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...problems];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Difficulty filter
    if (difficultyFilter !== "all") {
      filtered = filtered.filter((p) => p.difficulty === difficultyFilter);
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    // Sorting
    if (sortBy === "difficulty-asc") {
      const order = { EASY: 1, MEDIUM: 2, HARD: 3 };
      filtered.sort((a, b) => order[a.difficulty as keyof typeof order] - order[b.difficulty as keyof typeof order]);
    } else if (sortBy === "difficulty-desc") {
      const order = { EASY: 3, MEDIUM: 2, HARD: 1 };
      filtered.sort((a, b) => order[a.difficulty as keyof typeof order] - order[b.difficulty as keyof typeof order]);
    } else if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProblems(filtered);
  }, [searchQuery, difficultyFilter, categoryFilter, sortBy, problems]);

  // Get unique categories
  const categories = Array.from(new Set(problems.map((p) => p.category)));

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p>Loading problems...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Problems</h1>
        <p className="text-muted-foreground">
          {problems.length} coding challenges to master
        </p>
      </div>

      {/* Filters and Search */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Difficulty Filter */}
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="EASY">Easy</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HARD">Hard</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="difficulty-asc">Difficulty ↑</SelectItem>
              <SelectItem value="difficulty-desc">Difficulty ↓</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Summary */}
        {(searchQuery || difficultyFilter !== "all" || categoryFilter !== "all") && (
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="w-4 h-4" />
            <span>
              Showing {filteredProblems.length} of {problems.length} problems
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setDifficultyFilter("all");
                setCategoryFilter("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </Card>

      {/* Problems Table Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 text-sm font-medium text-muted-foreground border-b">
        <div className="col-span-1">Status</div>
        <div className="col-span-5">Title</div>
        <div className="col-span-2">Difficulty</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-2">Acceptance</div>
      </div>

      {/* Problems List */}
      <div className="space-y-0">
        {filteredProblems.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No problems found. Try adjusting your filters.
          </div>
        ) : (
          filteredProblems.map((problem, index) => (
            <Link
              key={problem.id}
              href={`/problems/${problem.id}`}
              className="block hover:bg-accent/50 transition-colors border-b last:border-b-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-4 items-center">
                {/* Status Icon */}
                <div className="hidden md:block col-span-1">
                  {Math.random() > 0.7 ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>

                {/* Title */}
                <div className="col-span-1 md:col-span-5">
                  <h3 className="font-medium hover:text-blue-600 transition-colors">
                    {problem.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {problem.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div className="col-span-1 md:col-span-2">
                  <Badge
                    variant="outline"
                    className={`${getDifficultyColor(problem.difficulty)} border`}
                  >
                    {problem.difficulty}
                  </Badge>
                </div>

                {/* Category */}
                <div className="col-span-1 md:col-span-2 text-sm text-muted-foreground">
                  {problem.category.replace(/_/g, " ")}
                </div>

                {/* Acceptance Rate */}
                <div className="hidden md:flex col-span-2 items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">
                    {getAcceptanceRate(index)}%
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Stats Footer */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">
            {problems.filter((p) => p.difficulty === "EASY").length}
          </div>
          <div className="text-sm text-muted-foreground">Easy Problems</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {problems.filter((p) => p.difficulty === "MEDIUM").length}
          </div>
          <div className="text-sm text-muted-foreground">Medium Problems</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-red-600">
            {problems.filter((p) => p.difficulty === "HARD").length}
          </div>
          <div className="text-sm text-muted-foreground">Hard Problems</div>
        </Card>
      </div>
    </div>
  );
}
