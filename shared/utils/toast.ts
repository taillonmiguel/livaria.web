type ToastType = "success" | "error" | "info" | "warning"

interface ToastOptions {
  duration?: number
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
}

class Toast {
  private createToast(message: string, type: ToastType, options?: ToastOptions) {
    // Create toast container if it doesn't exist
    let container = document.getElementById("toast-container")
    if (!container) {
      container = document.createElement("div")
      container.id = "toast-container"
      container.className = `toast-container ${options?.position || "top-right"}`
      document.body.appendChild(container)
    }

    // Create toast element
    const toast = document.createElement("div")
    toast.className = `toast toast-${type}`
    toast.innerHTML = `
      <div class="toast-content">
        <p>${message}</p>
      </div>
    `

    // Add to container
    container.appendChild(toast)

    // Animate in
    setTimeout(() => {
      toast.classList.add("show")
    }, 10)

    // Remove after duration
    setTimeout(() => {
      toast.classList.remove("show")
      setTimeout(() => {
        container.removeChild(toast)
        // Remove container if empty
        if (container.children.length === 0) {
          document.body.removeChild(container)
        }
      }, 300)
    }, options?.duration || 3000)
  }

  success(message: string, options?: ToastOptions) {
    this.createToast(message, "success", options)
  }

  error(message: string, options?: ToastOptions) {
    this.createToast(message, "error", options)
  }

  info(message: string, options?: ToastOptions) {
    this.createToast(message, "info", options)
  }

  warning(message: string, options?: ToastOptions) {
    this.createToast(message, "warning", options)
  }
}

export const toast = new Toast()

// Add CSS to document if not already present
if (!document.getElementById("toast-styles")) {
  const style = document.createElement("style")
  style.id = "toast-styles"
  style.innerHTML = `
    .toast-container {
      position: fixed;
      z-index: 9999;
      max-width: 320px;
      width: 100%;
    }
    
    .toast-container.top-right {
      top: 20px;
      right: 20px;
    }
    
    .toast-container.top-left {
      top: 20px;
      left: 20px;
    }
    
    .toast-container.bottom-right {
      bottom: 20px;
      right: 20px;
    }
    
    .toast-container.bottom-left {
      bottom: 20px;
      left: 20px;
    }
    
    .toast-container.top-center {
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .toast-container.bottom-center {
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .toast {
      margin-bottom: 10px;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transform: translateY(-20px);
      transition: all 0.3s ease;
      background-color: white;
    }
    
    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }
    
    .toast-success {
      border-left: 4px solid #4caf50;
    }
    
    .toast-error {
      border-left: 4px solid #f44336;
    }
    
    .toast-info {
      border-left: 4px solid #2196f3;
    }
    
    .toast-warning {
      border-left: 4px solid #ff9800;
    }
    
    .toast-content {
      display: flex;
      align-items: center;
    }
    
    .toast-content p {
      margin: 0;
      color: #333;
    }
    
    @media (max-width: 480px) {
      .toast-container {
        left: 10px;
        right: 10px;
        width: calc(100% - 20px);
        max-width: none;
      }
    }
  `
  document.head.appendChild(style)
}
