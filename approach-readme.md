# Approach & Architecture

## Summary
This project is a full-stack React and Node.js application for managing patient consents, transactions, and statistics, with secure Web3 integration. The architecture emphasizes modularity, clean code, and responsive UI/UX.

## Backend Data Fetching
- Each React component uses a centralized API service to load and update data (patients, consents, transactions, stats).
- Data loads when the component mounts and refreshes after any update to ensure consistency.

## State & Error Handling
- React hooks manage data, loading, and error states.
- UI reacts quickly to changes and provides clear feedback for errors and loading states.

## Web3 Integration
- MetaMask connection and message signing are handled via a custom `useWeb3` hook.
- Creating a consent requires a signed message for security and authenticity.

## UI/UX Design
- Lists and dashboards use responsive layouts and clean styling.
- Long values (wallet addresses, hashes) are shortened for readability.

## User Actions
- Users can search, filter, paginate, update statuses, and submit forms.
- Each action updates the backend and refreshes the UI for immediate feedback.

## Best Practices
- Code is modular, clean, and follows React standards.
- Proper error handling and validations are implemented throughout.

## Visual Hierarchy
- Important stats and actions are highlighted using clear layout, colors, and typography to improve user experience.