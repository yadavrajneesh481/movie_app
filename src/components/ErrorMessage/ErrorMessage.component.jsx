import "./ErrorMessage.styles.scss";

export default function ErrorMessage({ message }) {
  return (
    <p className="message-text">
      <span>⛔</span> {message}
    </p>
  );
}
