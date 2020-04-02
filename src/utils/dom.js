export function scrollToBottom(elementRef) {
  elementRef.current.scrollTop = elementRef.current.scrollHeight;
}
