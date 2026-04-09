const fs = require('fs');
let c = fs.readFileSync('e:/CV/my-app/app/portfolio/page.tsx', 'utf8');

c = c.replace(/bg-emerald-500 rounded-full mix-blend-screen opacity-\[0.03\]/g, 'bg-[var(--port-primary-container)] rounded-full mix-blend-screen opacity-[0.03]');
c = c.replace(/from-\[#00ff87\]\/50 via-transparent to-\[#60efff\]\/50/g, 'from-[var(--port-primary-container)]/50 via-transparent to-[var(--port-primary-container)]/50');
c = c.replace(/#00ff87/g, 'var(--port-primary-container)');
c = c.replace(/rgba\(0,255,135,[\d.]+\)/g, 'var(--port-primary-container)');
c = c.replace(/#60efff/g, 'var(--port-primary-container)');
c = c.replace(/rgba\(96,239,255,[\d.]+\)/g, 'var(--port-primary-container)');

c = c.replace(/'#00f2fe'/g, "'var(--port-primary-container)'");
c = c.replace(/'#f6d365'/g, "'var(--port-primary-container)'");
c = c.replace(/color: '#ff0844'/g, "color: 'var(--port-primary-container)'");

c = c.replace(/#a18cd1/g, 'var(--port-primary-container)');
c = c.replace(/rgba\(161,140,209,[\d.]+\)/g, 'var(--port-primary-container)');

c = c.replace(/'#ffb199'/g, "'var(--port-primary-container)'");
c = c.replace(/'#A0B5EB'/g, "'var(--port-primary-container)'");
c = c.replace(/'#4facfe'/g, "'var(--port-primary-container)'");

c = c.replace(/bg-emerald-400/g, 'bg-[var(--port-primary-container)] opacity-80');
c = c.replace(/bg-emerald-500\/10/g, 'bg-[var(--port-primary-container)]\/10');
c = c.replace(/bg-emerald-500/g, 'bg-[var(--port-primary-container)]');
c = c.replace(/text-emerald-500/g, 'text-[var(--port-primary-container)]');
c = c.replace(/border-emerald-500\/30/g, 'border-[var(--port-primary-container)]\/30');
c = c.replace(/border-emerald-500\/50/g, 'border-[var(--port-primary-container)]\/50');
c = c.replace(/border-emerald-500/g, 'border-[var(--port-primary-container)]');

c = c.replace(/shadow-\[0_0_8px_#10b981\]/g, 'shadow-[0_0_8px_var(--port-primary-container)]');
c = c.replace(/shadow-\[0_0_20px_#10b981\]/g, 'shadow-[0_0_20px_var(--port-primary-container)]');
c = c.replace(/shadow-\[0_0_5px_#10b981\]/g, 'shadow-[0_0_5px_var(--port-primary-container)]');

fs.writeFileSync('e:/CV/my-app/app/portfolio/page.tsx', c, 'utf8');
console.log('Fixed');
