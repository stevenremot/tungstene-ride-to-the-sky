;;; svg-generator.el --- A set of tool functions for generating assets

;;; Commentary:
;;
;;; Code:

(defun rand-range (min max)
  "Generate a random floating number between MIN and MAX."
  (+ min (* (/ (float (random 1000)) 1000.) (float (- max min)))))

(defun svg-create-random-buildings ()
  "Generate a line of random buildings."
  (interactive)
  (let ((current-pos 0)
        (min-width 4)
        (max-width 7)
        (min-height 3)
        (max-height 15)
        (image-width 200)
        (image-height 500)
        (min-padding 0)
        (max-padding 0.5))
    (while (<= (+ current-pos min-width) image-width)
      (let* ((constrained-max-width (min max-width (- image-width current-pos)))
             (width (rand-range min-width constrained-max-width))
             (height (rand-range min-height max-height)))
        (insert (format "<rect class=\"building\" x=\"%f\" y=\"%f\" width=\"%f\" height=\"%f\" />\n"
                        current-pos
                        (- image-height height)
                        width height))
        (setq current-pos
              (+ current-pos width (rand-range min-padding max-padding)))))))

(defun svg-create-random-stars ()
  "Generate a set of random stars."
  (interactive)
  (let ((star-field-width 200)
        (star-field-height 475)
        (star-min-radius 0.05)
        (star-max-radius 0.2)
        (stars-number 500))
    (dotimes (i stars-number)
      (let ((x (rand-range 0 star-field-width))
            (y (rand-range 0 star-field-height))
            (radius (rand-range star-min-radius star-max-radius))
            (opacity (rand-range 0 1)))
        (insert (format "<circle class=\"star\" cx=\"%f\" cy=\"%f\" r=\"%f\" opacity=\"%f\" />\n"
                        x
                        y
                        radius
                        opacity))))))


(provide 'svg-generator)

;;; svg-generator.el ends here
