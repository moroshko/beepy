import React from "react";

function Logo({ size }) {
  return (
    <svg viewBox="0 0 1024 1024" width={size} height={size}>
      <path d="M780.65 502.87H634.113a21.357 21.357 0 00-19.093 11.797l-46.742 93.504-59.946-259.712a21.384 21.384 0 00-18.902-16.448c-9.109-.619-17.856 4.352-21.504 12.842L400.192 502.87H243.307c-11.776 0-21.334 9.558-21.334 21.334 0 11.797 9.558 21.333 21.334 21.333h170.965c8.533 0 16.256-5.077 19.605-12.928l47.552-110.933 58.582 253.866c2.026 8.768 9.344 15.339 18.261 16.406a21.36 21.36 0 0021.61-11.648l67.393-134.742h133.354c11.798 0 21.334-9.536 21.334-21.333.021-11.776-9.515-21.355-21.312-21.355zM707.244 50.986c-77.014 0-146.24 48.448-195.243 90.474-49.003-42.026-118.23-90.474-195.221-90.474-173.462 0-314.603 141.098-314.603 314.56 0 397.376 481.323 597.61 501.803 605.93l3.498 1.408 3.798.128h.042c9.878 0 182.571-75.221 320.747-208.661 125.91-121.621 189.781-255.787 189.781-398.805-.021-173.462-141.141-314.56-314.602-314.56zm39.104 732.309c-102.379 83.392-205.803 132.416-234.475 145.216-64.853-28.117-467.03-216.384-467.03-562.965 0-149.91 121.985-271.894 271.937-271.894 70.165 0 136.896 52.544 180.992 92.075L512 198.507l14.25-12.779c44.075-39.552 110.806-92.075 180.993-92.075 149.93 0 271.914 121.984 271.914 271.894 0 151.338-78.314 291.882-232.81 417.749z" />
    </svg>
  );
}

export default Logo;
