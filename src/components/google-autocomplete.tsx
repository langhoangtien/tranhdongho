// import { useEffect, useRef, useState } from "react";

// interface AddressAutocompleteProps {
//   onSelect: (place: google.maps.places.PlaceResult) => void;
// }

// const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ onSelect }) => {
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [query, setQuery] = useState<string>("");
//   const [debouncedQuery, setDebouncedQuery] = useState<string>("");

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedQuery(query);
//     }, 500);

//     return () => clearTimeout(handler);
//   }, [query]);

//   useEffect(() => {
//     if (!debouncedQuery) return;

//     const loadGoogleMapsScript = () => {
//       if (!window.google) {
//         const script = document.createElement("script");
//         script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places`;
//         script.async = true;
//         script.onload = initAutocomplete;
//         document.body.appendChild(script);
//       } else {
//         initAutocomplete();
//       }
//     };

//     const initAutocomplete = () => {
//       if (!inputRef.current || !window.google) return;

//       const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
//         types: ["geocode"],
//       });

//       autocomplete.addListener("place_changed", () => {
//         const place = autocomplete.getPlace();
//         if (place.formatted_address) {
//           onSelect(place);
//         }
//       });
//     };

//     loadGoogleMapsScript();
//   }, [debouncedQuery]);

//   return (
//     <input
//       ref={inputRef}
//       type="text"
//       placeholder="Nhập địa chỉ..."
//       className="border p-2 rounded w-full"
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//     />
//   );
// };

// export default AddressAutocomplete;
