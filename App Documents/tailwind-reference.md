# Tailwind CSS Style Reference

This document provides the pixel-equivalent values for the standard Tailwind CSS utility classes used in the Superteam Brazil Academy project.

## 📏 Spacing Scale (Padding, Margin, Gap, Sizing)
The spacing scale is linear. **1 unit = 4px**.

### Utility Mapping
- `p-4`: Padding all sides (16px)
- `px-4`: Padding left & right (16px)
- `py-4`: Padding top & bottom (16px)
- `pt-4`, `pb-4`, `pl-4`, `pr-4`: Padding for specific sides (top, bottom, left, right)
---

## 🔡 Typography (Font Size)
Note: Modern browsers default to `16px` as the base font size.

| Tailwind Class | Pixel Value | Description |
| :--- | :--- | :--- |
| `text-xs` | **12px** | Extra Small (Labels, tooltips) |
| `text-sm` | **14px** | Small (Secondary text) |
| `text-base` | **16px** | Base (Default body text) |
| `text-lg` | **18px** | Large (Sub-headers) |
| `text-xl` | **20px** | Extra Large (Card titles) |
| `text-2xl` | **24px** | 2XL (Sections) |
| `text-3xl` | **30px** | 3XL |
| `text-4xl` | **36px** | 4XL (Hero headers) |
| `text-5xl` | **48px** | 5XL |
| `text-6xl` | **60px** | 6XL |

---

## 🥯 Border Radius
We are using a mix of Tailwind defaults and custom 4px-multiple values.

| Tailwind/Custom Class | Pixel Value | Description |
| :--- | :--- | :--- |
| `rounded-none` | **0px** | Sharp corners |
| `rounded-sm` | **2px** | |
| `rounded` | **4px** | |
| `rounded-md` | **6px** | |
| `rounded-lg` | **8px** | Standard small element |
| `rounded-xl` | **12px** | |
| `rounded-2xl` | **16px** | |
| `rounded-3xl` | **24px** | |
| `rounded-full` | **9999px** | Pill shape |
| **Custom** `rounded-20px`| **20px** | |
| **Custom** `rounded-28px`| **28px** | Standard Card Radius |
| **Custom** `rounded-64px`| **64px** | Large Section / CTA |

---

## 📱 Breakpoints
Used for responsive design (`md:`, `lg:`, etc.)

| Prefix | Min-width | Typical Device |
| :--- | :--- | :--- |
| `sm` | **640px** | Mobile (Landscape) |
| `md` | **768px** | Tablet (Portrait) |
| `lg` | **1024px** | Desktop / Tablet (Landscape) |
| `xl` | **1280px** | Large Monitor |
| `2xl` | **1536px** | XL Monitor |

### Scale Table
| Tailwind Unit | Pixel Value | 8px Grid Alignment |
| :--- | :--- | :--- |
| `0` | **0px** | ✅ |
| `0.5` | **2px** | |
| `1` | **4px** | |
| `1.5` | **6px** | |
| `2` | **8px** | ✅ |
| `3` | **12px** | |
| `4` | **16px** | ✅ |
| `5` | **20px** | |
| `6` | **24px** | ✅ |
| `8` | **32px** | ✅ |
| `10` | **40px** | ✅ |
| `12` | **48px** | ✅ |
| `16` | **64px** | ✅ |
| `20` | **80px** | ✅ |
| `24` | **96px** | ✅ |
| `32` | **128px** | ✅ |
| `40` | **160px** | ✅ |
| `48` | **192px** | ✅ |
| `56` | **224px** | ✅ |
| `64` | **256px** | ✅ |

