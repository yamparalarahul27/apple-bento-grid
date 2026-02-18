brand_yellow: #ffd23f
brand_cream: #f7eacb
brand_green: #2f6b3f 
brand_green_light: #008c4c 
brand_green_dark: #1b231d 

Based on Radix Colour System Generator
Light:
:root, .light, .light-theme {
  --green-1: #fbfefc;
  --green-2: #f4fbf6;
  --green-3: #e6f7ea;
  --green-4: #d6f1dd;
  --green-5: #c3e9ce;
  --green-6: #addebb;
  --green-7: #8ecfa2;
  --green-8: #5eb97f;
  --green-9: #008c4c;
  --green-10: #007e3f;
  --green-11: #008243;
  --green-12: #1c3b27;

  --green-a1: #00c04004;
  --green-a2: #00a32f0b;
  --green-a3: #00ae2919;
  --green-a4: #00a82c29;
  --green-a5: #00a22f3c;
  --green-a6: #00992c52;
  --green-a7: #00932e71;
  --green-a8: #009035a1;
  --green-a9: #008c4c;
  --green-a10: #007e3f;
  --green-a11: #008243;
  --green-a12: #00230ce3;

  --green-contrast: #fff;
  --green-surface: #f1faf4cc;
  --green-indicator: #008c4c;
  --green-track: #008c4c;
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root, .light, .light-theme {
      --green-1: oklch(99.4% 0.0048 153.9);
      --green-2: oklch(98.2% 0.0098 153.9);
      --green-3: oklch(95.9% 0.0246 153.9);
      --green-4: oklch(93.3% 0.0391 153.9);
      --green-5: oklch(90% 0.0536 153.9);
      --green-6: oklch(85.7% 0.0701 153.9);
      --green-7: oklch(79.8% 0.0915 153.9);
      --green-8: oklch(71.5% 0.1229 153.9);
      --green-9: oklch(56.2% 0.1419 153.9);
      --green-10: oklch(51.6% 0.1419 153.9);
      --green-11: oklch(52.9% 0.1419 153.9);
      --green-12: oklch(32.2% 0.0515 153.9);

      --green-a1: color(display-p3 0.0235 0.6745 0.0235 / 0.012);
      --green-a2: color(display-p3 0.0235 0.6118 0.1216 / 0.04);
      --green-a3: color(display-p3 0.0118 0.5961 0.102 / 0.087);
      --green-a4: color(display-p3 0.0078 0.5882 0.0902 / 0.142);
      --green-a5: color(display-p3 0.0039 0.5686 0.1176 / 0.208);
      --green-a6: color(display-p3 0.0039 0.5294 0.102 / 0.283);
      --green-a7: color(display-p3 0.0039 0.498 0.0941 / 0.389);
      --green-a8: color(display-p3 0 0.4784 0.1098 / 0.542);
      --green-a9: color(display-p3 0 0.3961 0.1098 / 0.761);
      --green-a10: color(display-p3 0 0.349 0.0745 / 0.789);
      --green-a11: color(display-p3 0 0.3608 0.0863 / 0.781);
      --green-a12: color(display-p3 0 0.102 0.0235 / 0.859);

      --green-contrast: #fff;
      --green-surface: color(display-p3 0.9569 0.9804 0.9569 / 0.8);
      --green-indicator: oklch(56.2% 0.1419 153.9);
      --green-track: oklch(56.2% 0.1419 153.9);
    }
  }
}
:root, .light, .light-theme {
  --gray-1: #fdfdfd;
  --gray-2: #f9f9f9;
  --gray-3: #f0f0f0;
  --gray-4: #e8e8e8;
  --gray-5: #e1e1e1;
  --gray-6: #d9d9d9;
  --gray-7: #cecece;
  --gray-8: #bbb;
  --gray-9: #8c8c8c;
  --gray-10: #828282;
  --gray-11: #636363;
  --gray-12: #1f1f1f;

  --gray-a1: #00000002;
  --gray-a2: #00000006;
  --gray-a3: #0000000f;
  --gray-a4: #00000017;
  --gray-a5: #0000001e;
  --gray-a6: #00000026;
  --gray-a7: #00000031;
  --gray-a8: #00000044;
  --gray-a9: #00000073;
  --gray-a10: #0000007d;
  --gray-a11: #0000009c;
  --gray-a12: #000000e0;

  --gray-contrast: #FFFFFF;
  --gray-surface: #ffffffcc;
  --gray-indicator: #8c8c8c;
  --gray-track: #8c8c8c;
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root, .light, .light-theme {
      --gray-1: oklch(99.3% 0 none);
      --gray-2: oklch(98.1% 0 none);
      --gray-3: oklch(95.5% 0 none);
      --gray-4: oklch(93.1% 0 none);
      --gray-5: oklch(90.9% 0 none);
      --gray-6: oklch(88.5% 0 none);
      --gray-7: oklch(85.1% 0 none);
      --gray-8: oklch(79.2% 0 none);
      --gray-9: oklch(64% 0 none);
      --gray-10: oklch(60.5% 0 none);
      --gray-11: oklch(50% 0 none);
      --gray-12: oklch(24.1% 0 none);

      --gray-a1: color(display-p3 0 0 0 / 0.0078);
      --gray-a2: color(display-p3 0 0 0 / 0.0235);
      --gray-a3: color(display-p3 0 0 0 / 0.0588);
      --gray-a4: color(display-p3 0 0 0 / 0.0902);
      --gray-a5: color(display-p3 0 0 0 / 0.1176);
      --gray-a6: color(display-p3 0 0 0 / 0.149);
      --gray-a7: color(display-p3 0 0 0 / 0.1922);
      --gray-a8: color(display-p3 0 0 0 / 0.2667);
      --gray-a9: color(display-p3 0 0 0 / 0.451);
      --gray-a10: color(display-p3 0 0 0 / 0.4902);
      --gray-a11: color(display-p3 0 0 0 / 0.6118);
      --gray-a12: color(display-p3 0 0 0 / 0.8784);

      --gray-contrast: #FFFFFF;
      --gray-surface: color(display-p3 1 1 1 / 80%);
      --gray-indicator: oklch(64% 0 none);
      --gray-track: oklch(64% 0 none);
    }
  }
}
:root, .light, .light-theme, .radix-themes {
  --color-background: #fff;
}

Dark:
.dark, .dark-theme {
  --green-1: #0a140d;
  --green-2: #101c14;
  --green-3: #0c2e1a;
  --green-4: #003e1d;
  --green-5: #004c25;
  --green-6: #005b2e;
  --green-7: #006d38;
  --green-8: #008142;
  --green-9: #008c4c;
  --green-10: #007e3f;
  --green-11: #64d18d;
  --green-12: #9ef8bb;

  --green-a1: #00d10004;
  --green-a2: #00fb510c;
  --green-a3: #00f95920;
  --green-a4: #00fc5031;
  --green-a5: #00fd6140;
  --green-a6: #00fd6d50;
  --green-a7: #00fe7663;
  --green-a8: #00ff7a78;
  --green-a9: #00ff8384;
  --green-a10: #00ff7675;
  --green-a11: #78ffabce;
  --green-a12: #a2ffc0f8;

  --green-contrast: #fff;
  --green-surface: #10271780;
  --green-indicator: #008c4c;
  --green-track: #008c4c;
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    .dark, .dark-theme {
      --green-1: oklch(17.8% 0.0191 153.9);
      --green-2: oklch(21.1% 0.0231 153.9);
      --green-3: oklch(27% 0.0551 153.9);
      --green-4: oklch(31.8% 0.0832 153.9);
      --green-5: oklch(36.5% 0.0962 153.9);
      --green-6: oklch(41.4% 0.1076 153.9);
      --green-7: oklch(46.7% 0.1222 153.9);
      --green-8: oklch(52.7% 0.1419 153.9);
      --green-9: oklch(56.2% 0.1419 153.9);
      --green-10: oklch(51.6% 0.1419 153.9);
      --green-11: oklch(78% 0.1419 153.9);
      --green-12: oklch(90.6% 0.1206 153.9);

      --green-a1: color(display-p3 0 0.9725 0 / 0.013);
      --green-a2: color(display-p3 0.2353 0.9882 0.4039 / 0.047);
      --green-a3: color(display-p3 0.2353 1 0.4353 / 0.118);
      --green-a4: color(display-p3 0.1961 1 0.3882 / 0.185);
      --green-a5: color(display-p3 0.2784 1 0.4549 / 0.244);
      --green-a6: color(display-p3 0.3255 1 0.4902 / 0.307);
      --green-a7: color(display-p3 0.3647 0.9961 0.5216 / 0.379);
      --green-a8: color(display-p3 0.4 1 0.5333 / 0.463);
      --green-a9: color(display-p3 0.4078 1 0.5686 / 0.509);
      --green-a10: color(display-p3 0.3922 1 0.5216 / 0.45);
      --green-a11: color(display-p3 0.6196 1 0.7059 / 0.799);
      --green-a12: color(display-p3 0.7216 0.9961 0.7765 / 0.963);

      --green-contrast: #fff;
      --green-surface: color(display-p3 0.0784 0.1412 0.0863 / 0.5);
      --green-indicator: oklch(56.2% 0.1419 153.9);
      --green-track: oklch(56.2% 0.1419 153.9);
    }
  }
}

.dark, .dark-theme {
  --gray-1: #111113;
  --gray-2: #19191b;
  --gray-3: #222325;
  --gray-4: #292a2e;
  --gray-5: #303136;
  --gray-6: #393a40;
  --gray-7: #46484f;
  --gray-8: #5f606a;
  --gray-9: #6c6e79;
  --gray-10: #797b86;
  --gray-11: #b2b3bd;
  --gray-12: #eeeef0;

  --gray-a1: #1111bb03;
  --gray-a2: #cbcbf90b;
  --gray-a3: #d6e2f916;
  --gray-a4: #d1d9f920;
  --gray-a5: #d7ddfd28;
  --gray-a6: #d9defc33;
  --gray-a7: #dae2fd43;
  --gray-a8: #e0e3fd60;
  --gray-a9: #e0e4fd70;
  --gray-a10: #e3e7fd7e;
  --gray-a11: #eff0feb9;
  --gray-a12: #fdfdffef;

  --gray-contrast: #FFFFFF;
  --gray-surface: rgba(0, 0, 0, 0.05);
  --gray-indicator: #6c6e79;
  --gray-track: #6c6e79;
}

@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    .dark, .dark-theme {
      --gray-1: oklch(17.8% 0.0042 277.7);
      --gray-2: oklch(21.5% 0.004 277.7);
      --gray-3: oklch(25.5% 0.0055 277.7);
      --gray-4: oklch(28.4% 0.0075 277.7);
      --gray-5: oklch(31.4% 0.0089 277.7);
      --gray-6: oklch(35% 0.01 277.7);
      --gray-7: oklch(40.2% 0.0121 277.7);
      --gray-8: oklch(49.2% 0.0157 277.7);
      --gray-9: oklch(54% 0.0167 277.7);
      --gray-10: oklch(58.6% 0.0165 277.7);
      --gray-11: oklch(77% 0.0138 277.7);
      --gray-12: oklch(94.9% 0.0026 277.7);

      --gray-a1: color(display-p3 0.0667 0.0667 0.9412 / 0.009);
      --gray-a2: color(display-p3 0.8 0.8 0.9804 / 0.043);
      --gray-a3: color(display-p3 0.851 0.898 0.9882 / 0.085);
      --gray-a4: color(display-p3 0.8392 0.8706 1 / 0.122);
      --gray-a5: color(display-p3 0.8471 0.8745 1 / 0.156);
      --gray-a6: color(display-p3 0.8784 0.898 1 / 0.194);
      --gray-a7: color(display-p3 0.8745 0.9059 0.9961 / 0.257);
      --gray-a8: color(display-p3 0.8941 0.9059 1 / 0.37);
      --gray-a9: color(display-p3 0.8902 0.9098 1 / 0.433);
      --gray-a10: color(display-p3 0.902 0.9176 1 / 0.488);
      --gray-a11: color(display-p3 0.9451 0.949 1 / 0.719);
      --gray-a12: color(display-p3 0.9922 0.9922 1 / 0.937);

      --gray-contrast: #FFFFFF;
      --gray-surface: color(display-p3 0 0 0 / 5%);
      --gray-indicator: oklch(54% 0.0167 277.7);
      --gray-track: oklch(54% 0.0167 277.7);
    }
  }
}
.dark, .dark-theme, :is(.dark, .dark-theme) :where(.radix-themes:not(.light, .light-theme)) {
  --color-background: #111;
}
