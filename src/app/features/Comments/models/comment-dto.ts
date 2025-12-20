export interface ReviewDto {
  //public int Id { get; set; }
  // public string MovieTitle { get; set; }
  // public string FullName { get; set; }
  // public int Rating { get; set; }
  // public string Comment { get; set; }
  // public DateTime CreatedAt { get; set; }
  id: number;
  movieTitle: string;
  fullName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
