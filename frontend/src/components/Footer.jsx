export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 mt-10">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Learning Management System — All rights
        reserved.
      </p>
    </footer>
  );
}
