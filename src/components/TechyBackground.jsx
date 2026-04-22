import { motion as Motion, useTransform } from 'framer-motion'

const CONTOUR_STROKE = 'rgba(125, 211, 252, 0.42)'
const CONTOUR_STROKE_SOFT = 'rgba(125, 211, 252, 0.26)'
const CONTOUR_STROKE_FAINT = 'rgba(103, 232, 249, 0.2)'

export default function TechyBackground({ scrollYProgress }) {
  const farX = useTransform(scrollYProgress, [0, 1], [0, -140])
  const farY = useTransform(scrollYProgress, [0, 1], [0, 220])
  const midX = useTransform(scrollYProgress, [0, 1], [0, 200])
  const midY = useTransform(scrollYProgress, [0, 1], [0, -260])
  const nearX = useTransform(scrollYProgress, [0, 1], [0, -300])
  const nearY = useTransform(scrollYProgress, [0, 1], [0, 340])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 ln-topo-base" />

      <Motion.svg
        viewBox="0 0 2000 1400"
        preserveAspectRatio="xMidYMid slice"
        className="ln-topo-svg ln-topo-far"
        style={{ x: farX, y: farY }}
        aria-hidden="true"
      >
        <g stroke={CONTOUR_STROKE_FAINT} fill="none" strokeWidth="1.1">
          <path d="M 780 -60 C 900 -110, 1120 -110, 1260 -50 C 1360 -10, 1380 70, 1300 130 C 1180 200, 940 200, 820 140 C 680 80, 680 -10, 780 -60 Z" />
          <path d="M 820 -30 C 920 -70, 1110 -70, 1230 -20 C 1310 20, 1330 80, 1270 130 C 1170 180, 960 180, 860 130 C 740 80, 740 10, 820 -30 Z" />
          <path d="M 860 0 C 940 -30, 1090 -30, 1190 10 C 1260 40, 1280 80, 1230 120 C 1150 160, 990 160, 900 120 C 810 90, 800 40, 860 0 Z" />
        </g>
        <g stroke={CONTOUR_STROKE_FAINT} fill="none" strokeWidth="1.1">
          <path d="M 1300 1200 C 1420 1140, 1640 1140, 1800 1200 C 1920 1260, 1960 1360, 1880 1440 C 1760 1540, 1540 1540, 1400 1480 C 1240 1400, 1200 1280, 1300 1200 Z" />
          <path d="M 1340 1230 C 1440 1180, 1620 1180, 1760 1230 C 1860 1280, 1900 1360, 1840 1420 C 1740 1500, 1560 1500, 1440 1450 C 1300 1390, 1270 1290, 1340 1230 Z" />
        </g>
      </Motion.svg>

      <Motion.svg
        viewBox="0 0 2000 1400"
        preserveAspectRatio="xMidYMid slice"
        className="ln-topo-svg ln-topo-mid"
        style={{ x: midX, y: midY }}
        aria-hidden="true"
      >
        <g stroke={CONTOUR_STROKE_SOFT} fill="none" strokeWidth="1.3">
          <path d="M 80 260 C 150 130, 340 100, 490 180 C 620 250, 660 400, 570 520 C 470 640, 260 640, 140 530 C 10 410, 10 370, 80 260 Z" />
          <path d="M 140 290 C 200 190, 340 170, 460 230 C 570 290, 600 410, 530 500 C 450 600, 290 600, 190 510 C 90 420, 90 370, 140 290 Z" />
          <path d="M 200 320 C 240 250, 340 240, 430 280 C 510 320, 540 400, 500 470 C 450 540, 340 550, 260 500 C 180 450, 160 390, 200 320 Z" />
          <path d="M 250 350 C 280 310, 350 300, 410 320 C 470 340, 490 390, 470 430 C 440 480, 360 490, 300 470 C 230 440, 220 390, 250 350 Z" />
        </g>

        <g stroke={CONTOUR_STROKE_SOFT} fill="none" strokeWidth="1.3">
          <path d="M 1380 180 C 1470 80, 1660 80, 1800 200 C 1920 310, 1960 470, 1880 590 C 1780 720, 1580 720, 1440 610 C 1280 480, 1280 290, 1380 180 Z" />
          <path d="M 1430 230 C 1510 150, 1650 150, 1770 250 C 1870 340, 1900 470, 1830 580 C 1740 680, 1580 680, 1480 590 C 1350 490, 1350 310, 1430 230 Z" />
          <path d="M 1480 280 C 1540 220, 1640 220, 1730 290 C 1810 350, 1840 450, 1790 540 C 1720 620, 1600 620, 1520 560 C 1420 500, 1420 350, 1480 280 Z" />
          <path d="M 1530 320 C 1580 280, 1650 280, 1710 325 C 1770 370, 1790 440, 1760 510 C 1710 580, 1620 580, 1560 535 C 1480 480, 1480 370, 1530 320 Z" />
        </g>

        <g stroke={CONTOUR_STROKE_SOFT} fill="none" strokeWidth="1.3">
          <path d="M 40 880 C 140 760, 350 760, 480 850 C 590 930, 610 1080, 510 1180 C 400 1290, 220 1280, 110 1200 C -40 1080, -40 980, 40 880 Z" />
          <path d="M 100 910 C 180 830, 340 830, 450 900 C 550 970, 570 1080, 490 1160 C 400 1240, 250 1240, 150 1180 C 20 1080, 20 990, 100 910 Z" />
          <path d="M 160 940 C 220 880, 330 880, 420 940 C 510 1000, 530 1080, 460 1140 C 390 1200, 270 1200, 190 1150 C 80 1080, 80 1000, 160 940 Z" />
          <path d="M 210 970 C 260 920, 320 920, 390 960 C 460 1000, 480 1050, 430 1100 C 380 1150, 290 1150, 230 1120 C 150 1080, 150 1020, 210 970 Z" />
        </g>
      </Motion.svg>

      <Motion.svg
        viewBox="0 0 2000 1400"
        preserveAspectRatio="xMidYMid slice"
        className="ln-topo-svg ln-topo-near"
        style={{ x: nearX, y: nearY }}
        aria-hidden="true"
      >
        <g stroke={CONTOUR_STROKE} fill="none" strokeWidth="1.4">
          <path d="M 900 520 C 1020 420, 1220 420, 1360 510 C 1480 590, 1510 740, 1420 850 C 1310 980, 1110 990, 980 900 C 830 790, 810 620, 900 520 Z" />
          <path d="M 950 560 C 1050 480, 1210 480, 1330 550 C 1430 620, 1460 740, 1390 830 C 1290 940, 1130 940, 1020 870 C 890 780, 880 650, 950 560 Z" />
          <path d="M 1000 600 C 1080 540, 1200 540, 1300 590 C 1380 640, 1410 730, 1360 800 C 1280 880, 1150 880, 1060 830 C 950 770, 950 680, 1000 600 Z" />
          <path d="M 1050 640 C 1110 600, 1190 600, 1270 630 C 1340 660, 1370 720, 1330 770 C 1280 830, 1180 830, 1110 800 C 1020 760, 1020 700, 1050 640 Z" />
          <path d="M 1100 680 C 1140 650, 1200 650, 1250 670 C 1300 690, 1320 730, 1290 770 C 1260 810, 1190 810, 1150 790 C 1080 760, 1080 720, 1100 680 Z" />
        </g>
      </Motion.svg>

      <div className="absolute inset-0 ln-topo-grain" />
      <div className="absolute inset-0 ln-topo-vignette" />
    </div>
  )
}
