"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Github, ChevronDown } from "lucide-react"

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [expandedProject, setExpandedProject] = useState(null)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const projects = [
    {
      id: 1,
      title: "날씨 정보 웹",
      shortDescription: "실시간 날씨 정보와 5일간 예보를 제공하는 반응형 웹 애플리케이션",
      description: "사용자의 위치 기반으로 실시간 날씨 정보와 상세한 기상 데이터를 제공하는 웹사이트입니다.",
      image: "/images/weather-app.png",
      tags: ["React", "Node.js", "Cursor"],
      features: [
        "실시간 날씨 정보 조회",
        "5일간 날씨 예보",
        "도시별 날씨 검색",
        "상세 기상 정보 (습도, 풍속 등)",
        "반응형 모바일 디자인",
      ],
      demoLink: "#",
      githubLink: "#",
      fullDescription:
        "날씨 정보 웹은 사용자에게 직관적이고 정확한 날씨 정보를 제공하는 웹 애플리케이션입니다. React를 사용한 반응형 사용자 인터페이스와 Node.js 백엔드, 외부 날씨 API를 연동하여 실시간 데이터를 제공합니다. Cursor AI를 활용하여 개발 효율성을 높였습니다.",
    },
    {
      id: 2,
      title: "영화 소개 사이트",
      shortDescription: "최신 영화 정보와 리뷰를 제공하는 영화 소개 웹사이트",
      description: "영화 정보 API를 활용하여 최신 영화 정보와 사용자 리뷰를 제공하는 웹사이트입니다.",
      image: "/images/movie-site.png",
      tags: ["React", "Node.js", "Cursor"],
      features: [
        "영화 정보 API 연동",
        "영화 검색 및 필터링",
        "사용자 리뷰 및 평점 시스템",
        "개인 관심 영화 목록 관리",
        "반응형 웹 디자인",
      ],
      demoLink: "#",
      githubLink: "#",
      fullDescription:
        "영화 소개 사이트는 영화 애호가들을 위한 정보 제공 플랫폼입니다. 외부 영화 API를 연동하여 최신 영화 정보를 가져오고, 사용자들이 리뷰와 평점을 남길 수 있는 기능을 제공합니다. React로 구현된 사용자 인터페이스와 Node.js 백엔드를 활용했습니다.",
    },
    {
      id: 3,
      title: "자폐 아동을 위한 보호자 앱",
      shortDescription: "자폐 아동의 일상 관리를 돕는 보호자용 모바일 애플리케이션",
      description: "자폐 아동의 행동 패턴을 분석하고 보호자가 효과적으로 관리할 수 있도록 돕는 앱입니다.",
      image: "/images/autism-app.png",
      tags: ["React", "Node.js", "Cursor"],
      features: [
        "아동 행동 패턴 기록 및 분석",
        "일정 관리 및 알림 기능",
        "감정 상태 추적",
        "보호자 간 정보 공유",
        "전문가 상담 연결 기능",
      ],
      demoLink: "#",
      githubLink: "#",
      fullDescription:
        "자폐 아동을 위한 보호자 앱은 현재 해커톤에 제출하여 예선 심사 중인 프로젝트입니다. React를 사용한 사용자 인터페이스로, 자폐 아동의 일상 패턴을 기록하고 분석하여 보호자가 더 나은 케어를 제공할 수 있도록 돕습니다. Node.js 백엔드를 통해 실시간 데이터 처리를 구현했습니다.",
      status: "해커톤 예선 심사 중",
    },
    {
      id: 4,
      title: "커뮤니티 블로그",
      shortDescription: "사용자들이 자유롭게 소통할 수 있는 커뮤니티 블로그 플랫폼",
      description: "사용자들이 글을 작성하고 댓글을 달며 소통할 수 있는 커뮤니티 기반의 블로그 플랫폼입니다.",
      image: "/images/community-blog.png",
      tags: ["React", "Node.js", "Cursor"],
      features: [
        "사용자 인증 및 권한 관리",
        "게시글 작성 및 편집 기능",
        "댓글 및 대댓글 시스템",
        "카테고리별 게시글 분류",
        "검색 및 필터링 기능",
      ],
      demoLink: "#",
      githubLink: "#",
      fullDescription:
        "커뮤니티 블로그는 사용자들이 자유롭게 소통하고 지식을 공유할 수 있는 플랫폼입니다. React를 사용한 반응형 프론트엔드와 Node.js 기반의 RESTful API로 구성되어 있습니다. 사용자 인증, 게시글 관리, 댓글 시스템 등 블로그의 핵심 기능들을 구현했습니다.",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeIn}
            >
              <Card
                className={`group h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  expandedProject === project.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20 p-6 flex flex-col justify-end">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm">{project.shortDescription}</p>
                      {project.status && (
                        <Badge variant="secondary" className="mt-2 w-fit">
                          {project.status}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 border-t"
                      >
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                              <Badge key={i} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-semibold">Key Features:</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                              {project.features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex gap-4 pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(project.githubLink, "_blank")
                              }}
                            >
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </Button>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(project.demoLink, "_blank")
                              }}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Demo
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedProject(project)
                              }}
                            >
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="p-4 text-center">
                    <ChevronDown
                      className={`w-6 h-6 mx-auto transition-transform duration-300 ${
                        expandedProject === project.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>
                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                  {selectedProject.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  {selectedProject.status && <Badge variant="outline">{selectedProject.status}</Badge>}
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                className="w-full rounded-md object-cover aspect-video"
              />
              <p className="text-muted-foreground">{selectedProject.fullDescription}</p>
              <div className="space-y-4">
                <h4 className="font-semibold">Key Features:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <Button variant="outline" asChild>
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </a>
                </Button>
                <Button asChild>
                  <a href={selectedProject.demoLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  )
}
