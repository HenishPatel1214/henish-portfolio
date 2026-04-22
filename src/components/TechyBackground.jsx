import { motion as Motion, useTransform } from 'framer-motion'

export default function TechyBackground({ scrollYProgress }) {
  const layerAX = useTransform(scrollYProgress, [0, 1], [0, -90])
  const layerAY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const layerBX = useTransform(scrollYProgress, [0, 1], [0, 70])
  const layerBY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const layerCX = useTransform(scrollYProgress, [0, 1], [0, 45])
  const layerCY = useTransform(scrollYProgress, [0, 1], [0, 65])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 ln-wave-base" />

      <Motion.svg
        viewBox="0 0 1800 1200"
        preserveAspectRatio="none"
        className="ln-wave-svg ln-wave-fill-a"
        style={{ x: layerAX, y: layerAY }}
        aria-hidden="true"
      >
        <path
          d="M -220 390 C 220 300 620 390 1040 356 C 1390 330 1680 396 1990 612 L 1990 930 C 1520 748 1140 672 784 648 C 388 620 52 706 -220 846 Z"
          fill="rgba(64, 74, 92, 0.42)"
        />
        <path
          d="M -180 720 C 182 640 468 678 798 766 C 1118 848 1364 936 1660 1018 C 1818 1060 1944 1118 2020 1180 L 2020 1360 L -180 1360 Z"
          fill="rgba(45, 53, 70, 0.5)"
        />
      </Motion.svg>

      <Motion.svg
        viewBox="0 0 1800 1200"
        preserveAspectRatio="none"
        className="ln-wave-svg ln-wave-fill-b"
        style={{ x: layerBX, y: layerBY }}
        aria-hidden="true"
      >
        <path
          d="M -180 572 C 148 524 492 552 824 654 C 1136 750 1404 860 1710 1014 C 1844 1082 1948 1144 2042 1234 L 2042 1320 L -180 1320 Z"
          fill="rgba(81, 92, 111, 0.3)"
        />
        <path
          d="M -120 462 C 174 438 438 486 676 570 C 864 640 1034 742 1246 866 C 1390 954 1540 1022 1780 1086 L 1780 1218 L -120 1218 Z"
          fill="rgba(97, 108, 129, 0.22)"
        />
      </Motion.svg>

      <Motion.svg
        viewBox="0 0 1800 1200"
        preserveAspectRatio="none"
        className="ln-wave-svg ln-wave-lines"
        style={{ x: layerCX, y: layerCY }}
        aria-hidden="true"
      >
        <path
          d="M 1400 -160 C 1340 172 1448 442 1718 700 C 1856 834 1974 934 2140 1042"
          stroke="rgba(176, 184, 196, 0.26)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 1248 -172 C 1184 184 1272 486 1520 764 C 1658 914 1802 1032 1964 1140"
          stroke="rgba(176, 184, 196, 0.22)"
          strokeWidth="2"
          fill="none"
        />
        <ellipse
          cx="930"
          cy="1048"
          rx="224"
          ry="108"
          transform="rotate(28 930 1048)"
          stroke="rgba(176, 184, 196, 0.24)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M -120 914 C 122 920 350 1026 560 1188 C 702 1300 818 1412 912 1532"
          stroke="rgba(176, 184, 196, 0.18)"
          strokeWidth="2"
          fill="none"
        />
      </Motion.svg>

      <div className="absolute inset-0 ln-wave-grain" />
      <div className="absolute inset-0 ln-wave-vignette" />
    </div>
  )
}
