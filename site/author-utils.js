function getAuthorInitials(name) {
  const words = name.trim().split(/\s+/);
  const initials = words.length > 1
    ? words.slice(0, 2).map(function (word) { return Array.from(word)[0]; }).join('')
    : Array.from(words[0]).slice(0, 2).join('');
  return initials.toUpperCase() || '--';
}
