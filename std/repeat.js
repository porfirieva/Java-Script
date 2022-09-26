function repeat(text, count) {
  do {
    console.log(text);
    count -= 1;
  } while (count > 0);
}

repeat("hey", 4);