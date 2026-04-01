'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface SpeakerCardProps {
  name: string;
  title: string;
  topic: string;
  image: string;
}

export default function SpeakerCard({
  name,
  title,
  topic,
  image,
}: SpeakerCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="flex flex-col items-center gap-3 flex-shrink-0 w-[180px]"
    >
      <div className="relative">
        <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-gold">
          <Image
            src={image}
            alt={name}
            width={120}
            height={120}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold/20 to-transparent" />
      </div>
      <div className="text-center w-full">
        <h4 className="font-plus-jakarta font-bold text-pearl-white text-sm">
          {name}
        </h4>
        <p className="text-xs text-warm-gray-light mt-1">{title}</p>
        <div className="mt-2 inline-block">
          <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">
            {topic}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
