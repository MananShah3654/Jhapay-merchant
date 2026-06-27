import React from "react";

/**
 * On mobile this is just a full-bleed container.
 * On desktop it frames the app as a phone so the experience feels like a device.
 */
export default function PhoneFrame({ children }) {
  return (
    <div className="jh-phone-frame" data-testid="phone-frame">
      {children}
    </div>
  );
}
