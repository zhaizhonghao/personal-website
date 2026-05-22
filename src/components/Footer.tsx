export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-text-light">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
