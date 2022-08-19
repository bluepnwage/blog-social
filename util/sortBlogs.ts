import { FilterTypes, Topics } from "@interfaces/blogs";
import { BlogJoin } from "@interfaces/supabase";

function sortByTopic(blogs: BlogJoin[], topic: Topics) {
  return blogs.filter((blog) => blog.topic === topic);
}

function sortByFilter(blogs: BlogJoin[], filter: FilterTypes) {
  switch (filter) {
    case "popular": {
      const filtered = blogs.sort((a, b) => b.likes - a.likes);
      return filtered;
    }
    case "least popular": {
      const filtered = blogs.sort((a, b) => a.likes - b.likes);
      return filtered;
    }
    case "oldest": {
      const filtered = blogs.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
      return filtered;
    }
    case "recent": {
      const filtered = blogs.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
      return filtered;
    }
    default: {
      return blogs;
    }
  }
}

function sortBySearch(blogs: BlogJoin[], search: string) {
  const searchValue = search.trim().toLowerCase().replaceAll("  ", "");
  return blogs.filter((blog) => blog.heading.toLowerCase().includes(searchValue));
}

export function sortBlogs(blogs: BlogJoin[], topics: Topics, filter: FilterTypes, search: string) {
  let filteredBlogs = blogs;
  if (topics) filteredBlogs = sortByTopic(filteredBlogs, topics);
  if (filter) filteredBlogs = sortByFilter(filteredBlogs, filter);
  if (search) filteredBlogs = sortBySearch(filteredBlogs, search);

  return filteredBlogs;
}
