<template>
  <div class="loading-container">
    <!-- Replace spinner with financial icon animation -->
    <div class="financial-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="64"
        height="64"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
      <svg
        class="chart"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="64"
        height="64"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="22 12 18 16 14 11 10 15 6 9 2 14"></polyline>
      </svg>
    </div>
    <p class="message">{{ message }}</p>
    <p class="disclaimer">กรุณารอสักครู่...</p>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    message: {
      type: String,
      default: "กำลังโหลดข้อมูลการลงทุน",
    },
  },
};
</script>

<style scoped>
.loading-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.85);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

/* Financial icon styling */
.financial-icon {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.financial-icon svg {
  position: absolute;
  color: #10b981;
  opacity: 0.9;
}

.financial-icon svg.chart {
  animation: chartAnimation 3s ease-in-out infinite;
}

.financial-icon svg:first-child {
  animation: pulseAnimation 2s ease-in-out infinite;
  color: white;
}

.message {
  margin-top: 1.5rem;
  font-size: 1.2rem;
  text-align: center;
  color: white;
  font-weight: 500;
}

.disclaimer {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

@keyframes pulseAnimation {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes chartAnimation {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(5px);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
