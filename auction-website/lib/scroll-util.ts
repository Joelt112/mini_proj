/**
 * Smoothly scrolls to a specific element on the page
 * @param elementId The ID of the element to scroll to
 * @param offset Optional offset from the top of the element (in pixels)
 */
export function scrollToElement(elementId: string, offset = 0): void {
    const element = document.getElementById(elementId)
  
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }
  
  /**
   * Checks if the current URL has a hash and scrolls to that element
   * @param offset Optional offset from the top of the element (in pixels)
   */
  export function handleHashScroll(offset = 80): void {
    // Wait for the DOM to be fully loaded
    if (typeof window !== "undefined") {
      const hash = window.location.hash
  
      if (hash) {
        // Remove the # character
        const elementId = hash.substring(1)
  
        // Use setTimeout to ensure the DOM is ready
        setTimeout(() => {
          scrollToElement(elementId, offset)
        }, 100)
      }
    }
  }
  
  