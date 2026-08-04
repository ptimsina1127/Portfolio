"""Generate the OpenGraph preview image (1200x630) for the portfolio site.

Windows XP Luna-themed branded card matching the site's login screen:
blue gradient + radial glow, Windows flag, name + title, GitHub avatar,
and a navy taskbar strip with the domain and social handles.

Usage:
    python scripts/generate-og-image.py [--out public/og-image.png]
"""

import argparse
import io
import urllib.request

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630

ASSETS = "src/assets"
AVATAR_URL = "https://avatars.githubusercontent.com/u/80919172?v=4"
GOLD = (201, 168, 76, 255)

FONT_DIR = "C:/Windows/Fonts"


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def vertical_gradient(top, bottom):
    base = Image.new("RGB", (1, H), top)
    px = base.load()
    for y in range(H):
        px[0, y] = lerp(top, bottom, y / (H - 1))
    return base.resize((W, H))


def radial_glow(cx, cy, radius, color, strength=0.35):
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    steps = 100
    for i in range(steps, 0, -1):
        r = radius * i / steps
        alpha = int(strength * 255 * (1 - i / steps) ** 2)
        draw.ellipse(
            (cx - r, cy - r, cx + r, cy + r),
            fill=color + (alpha,),
        )
    return overlay


def load_font(name, size):
    return ImageFont.truetype(f"{FONT_DIR}/{name}", size)


def load_avatar():
    with urllib.request.urlopen(AVATAR_URL) as resp:
        data = resp.read()
    img = Image.open(io.BytesIO(data)).convert("RGB")
    img = img.resize((176, 176), Image.LANCZOS)
    return img


def draw_avatar(draw, img, center):
    x = center[0] - 88
    y = center[1] - 88
    draw.rectangle((x - 6, y - 6, x + 182, y + 182), fill=GOLD)
    draw.rectangle((x - 3, y - 3, x + 179, y + 179), outline=(255, 235, 170, 255), width=2)
    draw.rectangle((x, y, x + 176, y + 176), fill=(58, 110, 165, 255))
    base.paste(img, (x, y))


def text_with_shadow(draw, xy, text, font, fill, shadow=(10, 35, 90), offset=3):
    draw.text((xy[0] + offset, xy[1] + offset), text, font=font, fill=shadow)
    draw.text(xy, text, font=font, fill=fill)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", default="public/og-image.png")
    args = parser.parse_args()

    global base
    base = vertical_gradient((0x6E, 0xC8, 0xF0), (0x1A, 0x5A, 0xD0))

    glow = radial_glow(180, 60, 700, (255, 255, 255), 0.30)
    base = Image.alpha_composite(base.convert("RGBA"), glow).convert("RGB")

    draw = ImageDraw.Draw(base)

    flag = Image.open(f"{ASSETS}/xp-flag.png").convert("RGBA")
    flag = flag.resize((96, 96), Image.LANCZOS)
    base.paste(flag, (60, 70), flag)

    title_font = load_font("trebucbd.ttf", 66)
    sub_font = load_font("tahoma.ttf", 32)
    divider = ImageDraw.Draw(base)

    text_with_shadow(draw, (62, 210), "Pravat Timsina", title_font, (255, 255, 255))
    text_with_shadow(draw, (64, 318), "Software Developer", sub_font, (232, 244, 255))

    vx = 760
    divider.line((vx, 100, vx, 540), fill=(255, 255, 255, 90), width=2)

    draw_avatar(draw, load_avatar(), (940, 320))

    taskbar = ImageDraw.Draw(base)
    tb_h = 44
    for y in range(tb_h):
        taskbar.line(
            (0, H - tb_h + y, W, H - tb_h + y),
            fill=lerp((0x1A, 0x3A, 0x6A), (0x0D, 0x22, 0x40), y / (tb_h - 1)),
        )
    taskbar.line((0, H - tb_h, W, H - tb_h), fill=(0x2A, 0x5A, 0x9A), width=1)

    domain_font = load_font("tahomabd.ttf", 20)
    handle_font = load_font("tahoma.ttf", 16)
    text_with_shadow(draw, (60, H - tb_h + 11), "pravatk.com.np", domain_font, (255, 255, 255), shadow=(0, 10, 30), offset=2)

    handles = "github.com/ptimsina1127   linkedin.com/in/ptimsina   x.com/pravatktimsina"
    hw = draw.textlength(handles, font=handle_font)
    text_with_shadow(
        draw,
        (W - 60 - hw, H - tb_h + 13),
        handles,
        handle_font,
        (214, 228, 246),
        shadow=(0, 10, 30),
        offset=2,
    )

    base.save(args.out, "PNG")
    print(f"Wrote {args.out} ({W}x{H})")


if __name__ == "__main__":
    main()
