export function sortEvents(events) {
  return events.sort((a, b) => {
    if (b.countFollower !== a.countFollower) {
      // Sort by countFollower from higher to lower
      return b.countFollower - a.countFollower;
    } else {
      // Sort by eventStartDate from oldest to newest if countFollower is equal
      return new Date(a.eventStartDate) - new Date(b.eventStartDate);
    }
  });
}
