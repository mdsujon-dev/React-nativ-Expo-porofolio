import { useRef, useState } from 'react';
import { ScrollView, View, type LayoutChangeEvent } from 'react-native';

import { Footer, Navbar, ScreenContainer, SideDrawer } from '@/components/layout';

import { ContactSection } from './contact-section';
import { ExperiencesSection } from './experiences-section';
import { HeroSection } from './hero-section';
import { ProfileSection } from './profile-section';
import { ProjectsSection } from './projects-section';
import { SkillsSection } from './skills-section';

/** Portfolio home page — navbar, flowing sections, footer and side drawer. */
export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const offsets = useRef<Record<string, number>>({});

  const captureOffset = (key: string) => (event: LayoutChangeEvent) => {
    offsets.current[key] = event.nativeEvent.layout.y;
  };

  const scrollToSection = (key: string) => {
    scrollRef.current?.scrollTo({ y: offsets.current[key] ?? 0, animated: true });
  };

  return (
    <ScreenContainer>
      <Navbar onMenuPress={() => setMenuOpen(true)} />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ gap: 36, paddingBottom: 8 }}
        showsVerticalScrollIndicator={false}>
        <View onLayout={captureOffset('Home')}>
          <HeroSection
            onHire={() => scrollToSection('Contact')}
            onViewWork={() => scrollToSection('Projects')}
          />
        </View>
        <View onLayout={captureOffset('About')}>
          <ProfileSection />
        </View>
        <View onLayout={captureOffset('Skills')}>
          <SkillsSection />
        </View>
        <View onLayout={captureOffset('Projects')}>
          <ProjectsSection />
        </View>
        <View onLayout={captureOffset('Experience')}>
          <ExperiencesSection />
        </View>
        <View onLayout={captureOffset('Contact')}>
          <ContactSection />
        </View>
        <Footer />
      </ScrollView>
      <SideDrawer
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={scrollToSection}
      />
    </ScreenContainer>
  );
}
