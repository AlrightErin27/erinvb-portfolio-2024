// Location: src/Components/Weatherly/TensorFlow/WeatherSuggestions.js

const tempRanges = [
  { min: -15, max: 0, category: "Absolutely Freezing" },
  { min: 1, max: 10, category: "Pretty Chilly" },
  { min: 11, max: 20, category: "Just Right" },
  { min: 21, max: 30, category: "Nicely Warm" },
  { min: 31, max: 50, category: "Toasty Hot" },
];

const suggestions = {
  "Absolutely Freezing": {
    clothing: [
      "Time for your coziest winter coat",
      "Layer up with those soft thermal underthings",
      "Your warmest boots are calling",
      "Don't forget your favorite fluffy gloves",
      "That cute winter hat's moment to shine",
      "Wrap up in your softest scarf",
    ],
    activities: [
      "Perfect day to explore that museum you've been meaning to visit",
      "Cozy up in a local café with a steaming drink",
      "Movie marathon day? We think yes!",
      "Time to try that indoor rock climbing gym",
      "Browse some charming local bookshops",
    ],
    considerations: [
      "Bundle up like a warm cinnamon roll",
      "Hot chocolate weather? Absolutely!",
      "Keep those toes and fingers extra toasty",
      "Great day for working on your indoor hobby",
    ],
  },
  "Pretty Chilly": {
    clothing: [
      "Break out that stylish winter jacket",
      "Time for your favorite cozy sweater",
      "A warm scarf would look great today",
      "Don't forget your comfy boots",
      "Maybe those cute earmuffs?",
    ],
    activities: [
      "Perfect weather for a brisk walk in the park",
      "How about ice skating at the local rink?",
      "Warm up with some window shopping",
      "Great day to explore the city's covered markets",
      "Visit that indoor garden you've been curious about",
    ],
    considerations: [
      "Layer up - you can always peel off if you get warm",
      "Pack a thermos of something toasty",
      "Great weather for trying that new coffee shop",
    ],
  },
  "Just Right": {
    clothing: [
      "Light jacket weather - grab your favorite!",
      "Perfect day for that cute layered look",
      "Comfy walking shoes are your best friend today",
      "Maybe a light scarf for style?",
      "Time to rock that transitional wardrobe",
    ],
    activities: [
      "Why not try a walking tour of the city?",
      "Perfect weather for outdoor cafés",
      "Farmers market day? Yes please!",
      "Great time to explore the botanical gardens",
      "How about a picnic in the park?",
    ],
    considerations: [
      "The weather's playing nice - make the most of it!",
      "Perfect for outdoor photography",
      "Great day for trying that rooftop restaurant",
    ],
  },
  "Nicely Warm": {
    clothing: [
      "Time for your breezy summer clothes",
      "Don't forget your favorite sunglasses",
      "How about that cute sun hat?",
      "Lightweight, breathable fabrics are your friends",
      "Perfect weather for that new summer outfit",
    ],
    activities: [
      "Beach day? Beach day!",
      "Perfect for a riverside walk",
      "How about an outdoor concert?",
      "Great time for a garden party",
      "Adventure to that rooftop bar you've been eyeing",
    ],
    considerations: [
      "Don't forget to pack your sunscreen",
      "Bring along a reusable water bottle",
      "Maybe pack a light layer for evening",
    ],
  },
  "Toasty Hot": {
    clothing: [
      "Time for your breeziest, lightest outfits",
      "That cool linen shirt would be perfect",
      "Your most comfortable sandals",
      "Don't forget your statement sunglasses",
      "Your favorite sun hat's time to shine",
    ],
    activities: [
      "Pool day? We think yes!",
      "Early morning or sunset adventures are your friend",
      "Perfect excuse to try that ice cream shop",
      "How about some indoor shopping?",
      "Water park adventure time!",
    ],
    considerations: [
      "Stay cool as a cucumber - seek shade often",
      "Hydration is your new best friend",
      "Perfect excuse for multiple ice cream breaks",
    ],
  },
};

const weatherConditions = {
  clear: {
    modifier: "Beautiful clear skies",
    additional: [
      "Perfect time to rock your favorite sunglasses",
      "Great lighting for capturing memorable photos",
      "Blue skies are calling - time for an adventure!",
    ],
  },
  rain: {
    modifier: "Rainy day magic",
    additional: [
      "Time to break out that stylish umbrella",
      "Your rain boots' time to shine",
      "Perfect excuse to hop between cozy cafes",
      "Everything looks prettier with a rainy sparkle",
    ],
  },
  snow: {
    modifier: "Winter wonderland alert",
    additional: [
      "Time to make some snow angels!",
      "Hot cocoa weather? Definitely hot cocoa weather",
      "Perfect day for cozy indoor views of the snow",
      "Don't forget your camera - everything's magical today",
    ],
  },
  cloudy: {
    modifier: "Cozy cloudy day",
    additional: [
      "Perfect lighting for outdoor photos",
      "Great day for exploring without the sun's glare",
      "Maybe pack a light layer just in case",
    ],
  },
  thunderstorm: {
    modifier: "Dramatic weather ahead",
    additional: [
      "Time for a cozy indoor movie marathon",
      "Perfect excuse to curl up with a good book",
      "How about trying that new indoor hobby?",
      "Great day for watching nature's light show from inside",
    ],
  },
};

const timeOfDay = {
  morning: {
    period: "6:00-11:59",
    considerations: [
      "Catch that beautiful morning light",
      "Perfect time for a fresh start",
      "Grab a coffee and watch the world wake up",
      "Morning dew makes everything sparkle",
    ],
  },
  afternoon: {
    period: "12:00-16:59",
    considerations: [
      "Peak adventure time!",
      "Find a sunny spot for lunch",
      "Don't forget your sun protection",
      "Perfect for outdoor activities",
    ],
  },
  evening: {
    period: "17:00-20:59",
    considerations: [
      "Golden hour photography time!",
      "Perfect for a sunset stroll",
      "Maybe dinner at that rooftop restaurant?",
      "Time to watch the city lights come alive",
    ],
  },
  night: {
    period: "21:00-5:59",
    considerations: [
      "Stargazing weather?",
      "City lights make everything magical",
      "Perfect time for that cozy night in",
      "Late-night café hopping anyone?",
    ],
  },
};

const humidityLevels = {
  low: {
    range: "0-30%",
    impact: [
      "Keep that water bottle handy",
      "Perfect time for hair styling!",
      "Your skin might want some extra moisturizer love",
      "Static electricity fun day!",
    ],
  },
  moderate: {
    range: "31-60%",
    impact: [
      "Perfect comfort zone",
      "Great hair day potential",
      "Ideal for most activities",
      "Your plants are happy today",
    ],
  },
  high: {
    range: "61-80%",
    impact: [
      "Embrace the natural beach waves in your hair",
      "Light, flowing fabrics are your friend",
      "Maybe skip the straightening iron today",
      "Perfect excuse for an indoor spa day",
    ],
  },
  "very high": {
    range: "81-100%",
    impact: [
      "Tropical vibes today!",
      "Time for that frizz-ease hair product",
      "Keep it light and breezy with your outfit",
      "Indoor activities might be your best friend",
    ],
  },
};

const windSpeed = {
  calm: {
    range: "0-5 mph",
    suggestions: [
      "Perfect day for that new hairstyle",
      "Great for outdoor dining",
      "Ideal for flying your drone",
      "Photography conditions are perfect",
    ],
  },
  breezy: {
    range: "6-15 mph",
    suggestions: [
      "Kite flying adventure time!",
      "Watch those autumn leaves dance",
      "Perfect for sailboat watching",
      "Maybe secure your sun hat",
    ],
  },
  windy: {
    range: "16-25 mph",
    suggestions: [
      "Hold onto your hat day!",
      "Great for windmill watching",
      "Watch out for bad hair days",
      "Perfect for storm watching from inside",
    ],
  },
  "very windy": {
    range: ">25 mph",
    suggestions: [
      "Indoor adventure day",
      "Watch nature's power from inside",
      "Perfect day for indoor photography",
      "Time to watch the trees dance",
    ],
  },
};

const uvIndex = {
  low: {
    range: "0-2",
    suggestions: [
      "Easy on the sun protection today",
      "Perfect for longer outdoor adventures",
      "Your skin's having a good day",
      "No need to hide from the sun",
    ],
  },
  moderate: {
    range: "3-5",
    suggestions: [
      "Don't forget that sunscreen",
      "Perfect hat weather",
      "Find some shade for lunch",
      "Balance sun and shade time",
    ],
  },
  high: {
    range: "6-7",
    suggestions: [
      "Time for your favorite sun hat",
      "Sunscreen is your best friend today",
      "Seek out those shady spots",
      "Perfect excuse for indoor museum time",
    ],
  },
  "very high": {
    range: "8-10+",
    suggestions: [
      "Sunscreen, hat, AND sunglasses kind of day",
      "Indoor activities might be more fun",
      "If outside, stick to the shade",
      "Perfect day for indoor shopping",
    ],
  },
};

const airQuality = {
  good: {
    range: "0-50",
    suggestions: [
      "Perfect day for deep breaths on your morning jog",
      "Outdoor yoga? Yes please!",
      "Great day for all outdoor activities",
      "Take the scenic route today",
    ],
  },
  moderate: {
    range: "51-100",
    suggestions: [
      "Still a nice day for outdoor activities",
      "Maybe take it a bit easier on the exercise",
      "Great for casual outdoor exploring",
      "Keep an eye on how you're feeling",
    ],
  },
  sensitive: {
    range: "101-150",
    suggestions: [
      "Indoor workout might be better today",
      "Short outdoor adventures are fine",
      "Perfect day for indoor hobbies",
      "Take it easy if you're sensitive to air quality",
    ],
  },
  unhealthy: {
    range: ">150",
    suggestions: [
      "Indoor day is the way to go",
      "Perfect time to explore indoor attractions",
      "How about that indoor pool?",
      "Great day for home projects",
    ],
  },
};

export {
  tempRanges,
  suggestions,
  weatherConditions,
  timeOfDay,
  humidityLevels,
  windSpeed,
  uvIndex,
  airQuality,
};
