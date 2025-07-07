"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Lightbulb, Rocket } from "lucide-react"

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="py-20 bg-muted/30">
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
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who I Am</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
          >
            <h3 className="text-2xl font-bold mb-4">열정적인 개발자</h3>
            <p className="text-muted-foreground mb-6">
              안녕하세요! 백엔드 개발자를 꿈꾸고 있는 박건우입니다. React와 Node.js를 배우고 있으며, 사용자가 직관적으로
              사용할 수 있는 웹 애플리케이션을 만드는 것을 좋아합니다.
            </p>
            <p className="text-muted-foreground mb-6">
              개발을 시작한 계기는 대학교에서 처음 접한 프로그래밍의 매력 때문이었습니다. 아이디어를 코드로 구현하고
              실제로 동작하는 것을 보는 순간이 신기했습니다.
            </p>
            <p className="text-muted-foreground">
              전공이 컴퓨터 공학이 아니기 때문에 새로운 기술을 학습하려고 노력하고 있으며, 여러 프로젝트에 기여하여
              실력을 키우고 있습니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              variants={fadeIn}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Backend Development</h4>
                      <p className="text-muted-foreground">
                        서버 사이드 로직과 데이터베이스 설계에 관심이 많으며, 안정적이고 확장 가능한 백엔드 시스템
                        구축을 목표로 합니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              variants={fadeIn}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Creative Solutions</h4>
                      <p className="text-muted-foreground">
                        복잡한 문제에 대한 혁신적이고 효과적인 해결책을 찾는 데 노력하고 있으며, 최적의 성능과 사용자
                        경험을 위해 노력합니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              variants={fadeIn}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Rocket className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Continuous Learner</h4>
                      <p className="text-muted-foreground">
                        최신 기술과 트렌드를 지속적으로 학습하며, 끊임없이 지식과 기술을 확장해 나가고 있습니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
