'use client';

import { config, library } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

import '@fortawesome/fontawesome-svg-core/styles.css';
import { ReactNode } from 'react';

library.add({});

export default function IconProvider({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
